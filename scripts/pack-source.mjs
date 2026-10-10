/**
 * 把本仓库的完整源码打包成 dist/source/cengcheng-src.zip。
 *
 * AGPL-3.0 第 13 条要求：通过网络提供修改版服务的人，必须向使用者提供
 * 对应的完整源码。本作品发布在 Bilibili Toy 上（属于网络提供服务），
 * 因此把源码随构建产物一起分发，并在作品内提供下载入口。
 *
 * 纯 Node 实现（zlib deflate），不依赖外部 zip 工具。
 */
import {createHash} from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import {deflateRawSync} from 'node:zlib'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT = path.join(ROOT, 'dist', 'source', 'cengcheng-src.zip')
const PREFIX = 'cengcheng-src/'

// 需要随源码分发的路径（文件或目录）
const INCLUDE = [
	'src',
	'public',
	'tests',
	'scripts',
	'package.json',
	'bun.lock',
	'astro.config.mjs',
	'biome.jsonc',
	'tsconfig.json',
	'wrangler.jsonc',
	'.env',
	'LICENSE',
	'NOTICE.md',
	'README.md',
	'CHANGELOG.md',
	'DOCUMENTATION.md',
]

// 这些目录/文件不进包
const EXCLUDE = [/[/\\]node_modules[/\\]/, /[/\\]dist[/\\]/, /[/\\]\.git[/\\]/, /[/\\]\.astro[/\\]/]
const EXCLUDE_EXT = new Set(['.log'])

function collect(target, acc = []) {
	const abs = path.join(ROOT, target)
	if (!fs.existsSync(abs)) return acc
	const stat = fs.statSync(abs)
	if (stat.isDirectory()) {
		for (const entry of fs.readdirSync(abs)) collect(path.join(target, entry), acc)
	} else if (stat.isFile()) {
		if (EXCLUDE.some((re) => re.test(abs))) return acc
		if (EXCLUDE_EXT.has(path.extname(abs))) return acc
		acc.push(target.split(path.sep).join('/'))
	}
	return acc
}

// --- 最小 ZIP（deflate）实现 -------------------------------------------------

const crcTable = (() => {
	const t = new Int32Array(256)
	for (let n = 0; n < 256; n++) {
		let c = n
		for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
		t[n] = c
	}
	return t
})()

function crc32(buf) {
	let c = -1
	for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
	return (c ^ -1) >>> 0
}

/** DOS 时间戳。固定值让构建可复现。 */
const DOS_TIME = 0
const DOS_DATE = ((2026 - 1980) << 9) | (10 << 5) | 11

function makeZip(entries) {
	const chunks = []
	const central = []
	let offset = 0

	for (const {name, data} of entries) {
		const nameBuf = Buffer.from(name, 'utf8')
		const crc = crc32(data)
		const deflated = deflateRawSync(data, {level: 9})
		// 压缩后没变小就原样存储
		const useDeflate = deflated.length < data.length
		const stored = useDeflate ? deflated : data
		const method = useDeflate ? 8 : 0

		const local = Buffer.alloc(30)
		local.writeUInt32LE(0x04034b50, 0)
		local.writeUInt16LE(20, 4) // version needed
		local.writeUInt16LE(0x0800, 6) // UTF-8 名称
		local.writeUInt16LE(method, 8)
		local.writeUInt16LE(DOS_TIME, 10)
		local.writeUInt16LE(DOS_DATE, 12)
		local.writeUInt32LE(crc, 14)
		local.writeUInt32LE(stored.length, 18)
		local.writeUInt32LE(data.length, 22)
		local.writeUInt16LE(nameBuf.length, 26)
		local.writeUInt16LE(0, 28)

		chunks.push(local, nameBuf, stored)

		const cd = Buffer.alloc(46)
		cd.writeUInt32LE(0x02014b50, 0)
		cd.writeUInt16LE(20, 4) // version made by
		cd.writeUInt16LE(20, 6) // version needed
		cd.writeUInt16LE(0x0800, 8)
		cd.writeUInt16LE(method, 10)
		cd.writeUInt16LE(DOS_TIME, 12)
		cd.writeUInt16LE(DOS_DATE, 14)
		cd.writeUInt32LE(crc, 16)
		cd.writeUInt32LE(stored.length, 20)
		cd.writeUInt32LE(data.length, 24)
		cd.writeUInt16LE(nameBuf.length, 28)
		cd.writeUInt32LE(offset, 42)
		central.push(cd, nameBuf)

		offset += local.length + nameBuf.length + stored.length
	}

	const centralBuf = Buffer.concat(central)
	const end = Buffer.alloc(22)
	end.writeUInt32LE(0x06054b50, 0)
	end.writeUInt16LE(entries.length, 8)
	end.writeUInt16LE(entries.length, 10)
	end.writeUInt32LE(centralBuf.length, 12)
	end.writeUInt32LE(offset, 16)

	return Buffer.concat([...chunks, centralBuf, end])
}

// --- 主流程 -----------------------------------------------------------------

const files = []
for (const target of INCLUDE) collect(target, files)
files.sort()

const entries = files.map((rel) => ({name: PREFIX + rel, data: fs.readFileSync(path.join(ROOT, rel))}))
const zip = makeZip(entries)

fs.mkdirSync(path.dirname(OUT), {recursive: true})
fs.writeFileSync(OUT, zip)

const digest = createHash('sha256').update(zip).digest('hex').slice(0, 12)
const kb = (zip.length / 1024).toFixed(0)
console.log(`源码包：${files.length} 个文件，${kb} KB → ${path.relative(ROOT, OUT)}`)
console.log(`sha256:${digest}`)
