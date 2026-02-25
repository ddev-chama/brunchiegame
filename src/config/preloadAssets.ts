/**
 * รายการ assets สำหรับ preload (ภาพ + ไฟล์)
 * ใช้ในหน้า Preload เพื่อ cache ก่อนเริ่มใช้งาน
 */
const ICON_BASE = '/icon';
const CARD_BASE = '/card';
const HEAD_BASE = '/head';
const TXT_BASE = '/txt';

export const PRELOAD_CACHE_KEY = 'brunchie_preload_done';
export const PRELOAD_VERSION = '1';

/** รายการ path ภาพใน /icon */
const iconImages = [
  `${ICON_BASE}/2-1.png`,
  `${ICON_BASE}/2-2.png`,
  `${ICON_BASE}/1-2.png`,
  `${ICON_BASE}/1-3.png`,
  `${ICON_BASE}/KJKJ_LOGO.png`,
  `${ICON_BASE}/line.png`,
  `${ICON_BASE}/facebook.png`,
  `${ICON_BASE}/logo_footer.png`,
];

/** รายการ path SVG ใน /icon */
const iconSvgs = [
  `${ICON_BASE}/LOGO.svg`,
  `${ICON_BASE}/icon-2.svg`,
  `${ICON_BASE}/icon-3.svg`,
  `${ICON_BASE}/icon-4.svg`,
  `${ICON_BASE}/icon-5.svg`,
  `${ICON_BASE}/icon-7.svg`,
  `${ICON_BASE}/end-text.svg`,
  `${ICON_BASE}/JoyAgain.svg`,
  `${ICON_BASE}/B3.svg`,
];

/** การ์ด /card */
const cards = [
  `${CARD_BASE}/2-3.png`,
  `${CARD_BASE}/2-4.png`,
  `${CARD_BASE}/2-5.png`,
  `${CARD_BASE}/2-6.png`,
  `${CARD_BASE}/2-7.png`,
  `${CARD_BASE}/2-9.png`,
];

/** head 01-20 */
const headImages = Array.from({ length: 20 }, (_, i) =>
  `${HEAD_BASE}/${(i + 1).toString().padStart(2, '0')}.png`
);

/** ไฟล์ txt */
const txtFiles = [
  `${TXT_BASE}/question1.txt`,
  `${TXT_BASE}/question2.txt`,
  `${TXT_BASE}/question3.txt`,
  `${TXT_BASE}/question4.txt`,
  `${TXT_BASE}/question7.txt`,
  `${TXT_BASE}/no_more.txt`,
];

/** รวมทุก URL สำหรับ preload */
export const PRELOAD_ASSET_URLS: string[] = [
  ...iconImages,
  ...iconSvgs,
  ...cards,
  ...headImages,
  ...txtFiles,
];
