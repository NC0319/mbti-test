/**
 * MBTI古韵人格 - 16型水墨风人物 SVG
 * 设计原则：
 *   - 头饰 = 第一识别符号（必须显著）
 *   - 手持物 = 第二识别符号（必须可辨）
 *   - 简化身体，把视觉焦点给头+物
 *   - 底部印章保证"知道是谁"
 */

const CharacterArt = (function() {
    
    // 16型人物配置 - 历史/诗词人物 + 关键识别元素
    const characters = {
        'INTJ': {
            name: '诸葛亮', title: '智略之眸',
            palette: { skin: '#F2D5B8', robe: '#2C3E50', accent: '#C45C4A', accent2: '#8B3A2A', hair: '#1A1A1A' },
            hat: 'lunjin', prop: 'yushan', beard: 'long',
            desc: '羽扇纶巾，运筹帷幄'
        },
        'INTP': {
            name: '苏轼', title: '东坡居士',
            palette: { skin: '#F2D5B8', robe: '#4A5A7A', accent: '#7A8AA8', accent2: '#5A6A8A', hair: '#1A1A1A' },
            hat: 'dongpo', prop: 'zhuzhang', beard: 'long',
            desc: '一蓑烟雨任平生'
        },
        'ENTJ': {
            name: '岳飞', title: '武穆之魂',
            palette: { skin: '#F2D5B8', robe: '#5A2A2A', accent: '#D4A04A', accent2: '#8B6B3A', hair: '#1A1A1A' },
            hat: 'zhankui', prop: 'changqiang', beard: 'long',
            desc: '精忠报国，怒发冲冠'
        },
        'ENTP': {
            name: '惠能', title: '禅宗六祖',
            palette: { skin: '#E8C098', robe: '#8B6B3A', accent: '#C45C4A', accent2: '#5A4A3A', hair: '#1A1A1A' },
            hat: 'guangtou', prop: 'fuchen', beard: 'none',
            desc: '本来无一物，何处惹尘埃'
        },
        'INFJ': {
            name: '屈原', title: '离骚之魂',
            palette: { skin: '#F2D5B8', robe: '#5A4A6B', accent: '#A87AA8', accent2: '#6A4A6A', hair: '#1A1A1A' },
            hat: 'gaoguan', prop: 'lancao', beard: 'long',
            desc: '路漫漫其修远兮'
        },
        'INFP': {
            name: '李商隐', title: '朦胧诗心',
            palette: { skin: '#F2D5B8', robe: '#6A5A8A', accent: '#D4A0C8', accent2: '#4A3A6A', hair: '#1A1A1A' },
            hat: 'ruanmao', prop: 'shijuan', beard: 'short',
            desc: '此情可待成追忆'
        },
        'ENFJ': {
            name: '孔子', title: '至圣先师',
            palette: { skin: '#F2D5B8', robe: '#8B5A3A', accent: '#D4A0A0', accent2: '#6A4A2A', hair: '#1A1A1A' },
            hat: 'rujin', prop: 'zhujian', beard: 'long',
            desc: '有教无类，因材施教'
        },
        'ENFP': {
            name: '李白', title: '诗仙醉月',
            palette: { skin: '#F2D5B8', robe: '#A8604A', accent: '#E8B860', accent2: '#7A4A2A', hair: '#1A1A1A' },
            hat: 'sanfa', prop: 'jiuhu', beard: 'short',
            desc: '举杯邀明月，对影成三人'
        },
        'ISTJ': {
            name: '司马迁', title: '史笔如椽',
            palette: { skin: '#F2D5B8', robe: '#4A5A4A', accent: '#B8A07A', accent2: '#3A4A3A', hair: '#1A1A1A' },
            hat: 'jinxian', prop: 'maobi', beard: 'long',
            desc: '究天人之际，通古今之变'
        },
        'ISFJ': {
            name: '孟母', title: '慈训之德',
            palette: { skin: '#F2D5B8', robe: '#8A5A6A', accent: '#D4B0A0', accent2: '#6A4A4A', hair: '#1A1A1A' },
            hat: 'faji', prop: 'zhisuo', beard: 'none',
            desc: '三迁之教，千古母仪'
        },
        'ESTJ': {
            name: '班固', title: '汉纪之柱',
            palette: { skin: '#F2D5B8', robe: '#5A3A2A', accent: '#D4A04A', accent2: '#3A2A1A', hair: '#1A1A1A' },
            hat: 'wusha', prop: 'yinshou', beard: 'long',
            desc: '断代为史，刚健笃定'
        },
        'ESFJ': {
            name: '长孙皇后', title: '温婉之仪',
            palette: { skin: '#FAE6D3', robe: '#A8505A', accent: '#E8B0A0', accent2: '#7A3A4A', hair: '#1A1A1A' },
            hat: 'fengguan', prop: 'yuruyi', beard: 'none',
            desc: '端庄温婉，母仪天下'
        },
        'ISTP': {
            name: '鲁智深', title: '禅杖降魔',
            palette: { skin: '#D4A878', robe: '#4A3A2A', accent: '#A8884A', accent2: '#2A1A0A', hair: '#1A1A1A' },
            hat: 'guangtou2', prop: 'chanzhang', beard: 'wild',
            desc: '拳打镇关西，倒拔垂杨柳'
        },
        'ISFP': {
            name: '王维', title: '诗佛画心',
            palette: { skin: '#F2D5B8', robe: '#7A6A8A', accent: '#B0A0C8', accent2: '#5A4A6A', hair: '#1A1A1A' },
            hat: 'ruanmao2', prop: 'guqin', beard: 'short',
            desc: '明月松间照，清泉石上流'
        },
        'ESTP': {
            name: '霍去病', title: '少年战神',
            palette: { skin: '#F2D5B8', robe: '#7A2A2A', accent: '#E8A040', accent2: '#5A1A1A', hair: '#1A1A1A' },
            hat: 'zhankui2', prop: 'changgong', beard: 'none',
            desc: '封狼居胥，勒石燕然'
        },
        'ESFP': {
            name: '杨贵妃', title: '回眸倾城',
            palette: { skin: '#FAE6D3', robe: '#C8506A', accent: '#E8C060', accent2: '#8A3A4A', hair: '#1A1A1A' },
            hat: 'gaoji', prop: 'mudan', beard: 'none',
            desc: '回眸一笑百媚生'
        }
    };
    
    /**
     * 生成人物 SVG
     */
    function getCharacterSVG(type) {
        const c = characters[type] || characters['INTJ'];
        const p = c.palette;
        const hatId = 'hat-' + type + '-' + Math.random().toString(36).slice(2, 8);
        
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 360" width="240" height="360">
            <defs>
                <radialGradient id="bg-${type}" cx="50%" cy="35%" r="70%">
                    <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.35"/>
                    <stop offset="50%" stop-color="${p.accent}" stop-opacity="0.12"/>
                    <stop offset="100%" stop-color="${p.accent}" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="robe-grad-${type}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="${p.robe}"/>
                    <stop offset="100%" stop-color="${p.accent2}"/>
                </linearGradient>
                <linearGradient id="skin-${type}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="${p.skin}"/>
                    <stop offset="100%" stop-color="${p.skin}" stop-opacity="0.85"/>
                </linearGradient>
            </defs>
            
            <!-- 背景晕染 -->
            <rect width="240" height="360" fill="url(#bg-${type})"/>
            <circle cx="120" cy="120" r="100" fill="${p.accent}" opacity="0.06"/>
            
            <!-- 衣袍主体（从肩到脚） -->
            <path d="M 55 200 L 50 180 Q 55 165 75 162 L 165 162 Q 185 165 190 180 L 185 200 L 200 350 Q 200 360 190 360 L 50 360 Q 40 360 40 350 Z"
                  fill="url(#robe-grad-${type})" stroke="${p.accent2}" stroke-width="1.5"/>
            
            <!-- 交领右衽（V字内衬） -->
            <path d="M 90 162 L 120 200 L 150 162 L 145 172 L 120 215 L 95 172 Z" fill="${p.accent}" opacity="0.95"/>
            <line x1="120" y1="200" x2="120" y2="215" stroke="${p.accent2}" stroke-width="0.8" opacity="0.6"/>
            
            <!-- 腰带 -->
            <rect x="50" y="245" width="140" height="14" fill="${p.accent}"/>
            <rect x="50" y="245" width="140" height="3" fill="${p.accent2}" opacity="0.5"/>
            <rect x="50" y="256" width="140" height="3" fill="${p.accent2}" opacity="0.5"/>
            
            <!-- 玉佩组 -->
            <line x1="120" y1="259" x2="120" y2="275" stroke="${p.accent}" stroke-width="1.5"/>
            <circle cx="120" cy="278" r="5" fill="${p.accent}" stroke="${p.accent2}" stroke-width="1"/>
            <circle cx="120" cy="290" r="3.5" fill="${p.accent}"/>
            <line x1="115" y1="298" x2="125" y2="298" stroke="${p.accent}" stroke-width="1.5"/>
            
            <!-- 大袖（双手位置） -->
            <ellipse cx="50" cy="260" rx="22" ry="38" fill="${p.robe}" transform="rotate(-12 50 260)"/>
            <ellipse cx="190" cy="260" rx="22" ry="38" fill="${p.robe}" transform="rotate(12 190 260)"/>
            <ellipse cx="50" cy="260" rx="14" ry="25" fill="${p.accent}" opacity="0.4" transform="rotate(-12 50 260)"/>
            <ellipse cx="190" cy="260" rx="14" ry="25" fill="${p.accent}" opacity="0.4" transform="rotate(12 190 260)"/>
            
            <!-- 颈部 -->
            <rect x="108" y="145" width="24" height="22" fill="url(#skin-${type})"/>
            <ellipse cx="120" cy="167" rx="14" ry="3" fill="${p.accent2}" opacity="0.3"/>
            
            <!-- 头（脸） -->
            <ellipse cx="120" cy="100" rx="36" ry="42" fill="url(#skin-${type})" stroke="${p.accent2}" stroke-width="1" opacity="0.95"/>
            
            <!-- 头发（从帽底溢出） -->
            <ellipse cx="84" cy="105" rx="6" ry="14" fill="${p.hair}" opacity="0.85"/>
            <ellipse cx="156" cy="105" rx="6" ry="14" fill="${p.hair}" opacity="0.85"/>
            
            <!-- 头饰/帽子 -->
            ${renderHeadwear(c.hat, type, p)}
            
            <!-- 五官 -->
            ${renderFace(p)}
            
            <!-- 胡须 -->
            ${renderBeard(c.beard, p)}
            
            <!-- 手持物 -->
            ${renderProp(c.prop, p)}
            
            <!-- 印章：人物名 -->
            <g transform="translate(205 320) rotate(-6)">
                <rect x="-26" y="-26" width="52" height="52" fill="${p.accent}" opacity="0.15" stroke="${p.accent}" stroke-width="2.5"/>
                <text x="0" y="-4" font-family="STKaiti,KaiTi,serif" font-size="14" fill="${p.accent}" text-anchor="middle" font-weight="bold" opacity="0.95">${c.name}</text>
                <text x="0" y="14" font-family="STKaiti,KaiTi,serif" font-size="9" fill="${p.accent}" text-anchor="middle" opacity="0.75">${c.title}</text>
            </g>
        </svg>`;
    }
    
    /**
     * 头饰渲染 — 16型各有独特头饰
     */
    function renderHeadwear(hat, type, p) {
        const h = p.hair;
        const a = p.accent;
        const a2 = p.accent2;
        switch(hat) {
            // === 诸葛亮纶巾（青色软包头）===
            case 'lunjin':
                return `
                    <!-- 底圈（额头处的包头） -->
                    <path d="M 80 88 Q 82 70 120 65 Q 158 70 160 88 L 160 100 Q 158 95 120 95 Q 82 95 80 100 Z" fill="#1F3A52"/>
                    <!-- 中层（包头主体，斜纹布效果） -->
                    <path d="M 82 78 Q 90 55 120 50 Q 150 55 158 78 L 158 88 Q 152 70 120 65 Q 88 70 82 88 Z" fill="#2C4A6A"/>
                    <!-- 折纹 -->
                    <path d="M 90 75 Q 105 68 120 70" stroke="#1A2A3A" stroke-width="1" fill="none" opacity="0.7"/>
                    <path d="M 100 80 Q 115 73 130 75" stroke="#1A2A3A" stroke-width="1" fill="none" opacity="0.6"/>
                    <path d="M 110 60 Q 120 55 130 60" stroke="#1A2A3A" stroke-width="1" fill="none" opacity="0.5"/>
                    <!-- 顶部小结 -->
                    <ellipse cx="120" cy="52" rx="8" ry="5" fill="#1F3A52"/>
                    <circle cx="120" cy="50" r="2" fill="${a}"/>
                    <!-- 飘带 -->
                    <path d="M 122 55 Q 130 70 135 95" stroke="#1F3A52" stroke-width="2" fill="none" opacity="0.7"/>`;
            
            // === 苏轼东坡巾（折角帽）===
            case 'dongpo':
                return `
                    <!-- 帽身 -->
                    <path d="M 82 78 Q 88 52 120 50 Q 152 52 158 78 L 158 86 L 82 86 Z" fill="#3A4A6A"/>
                    <!-- 帽檐（折角）-->
                    <path d="M 80 80 L 78 70 L 88 78 Z" fill="#2A3A5A"/>
                    <path d="M 160 80 L 162 70 L 152 78 Z" fill="#2A3A5A"/>
                    <!-- 帽顶折线 -->
                    <path d="M 95 60 L 105 65 L 115 58 L 125 65 L 135 58 L 145 65" stroke="#2A3A5A" stroke-width="1.5" fill="none"/>
                    <!-- 帽正（中间装饰） -->
                    <rect x="115" y="68" width="10" height="6" fill="${a}"/>
                    <circle cx="120" cy="71" r="1.5" fill="${a2}"/>
                    <!-- 帽带 -->
                    <line x1="80" y1="86" x2="160" y2="86" stroke="${a2}" stroke-width="1.5"/>`;
            
            // === 岳飞战盔 ===
            case 'zhankui':
                return `
                    <!-- 盔身 -->
                    <path d="M 80 80 Q 80 50 120 48 Q 160 50 160 80 L 162 92 L 78 92 Z" fill="#5A5A6A"/>
                    <!-- 盔顶 -->
                    <path d="M 95 50 Q 100 40 120 38 Q 140 40 145 50" fill="#6A6A7A"/>
                    <!-- 红缨 -->
                    <path d="M 120 38 L 113 22 L 117 25 L 120 18 L 123 25 L 127 22 Z" fill="#C45C4A"/>
                    <path d="M 120 18 L 120 10" stroke="#C45C4A" stroke-width="2"/>
                    <circle cx="120" cy="10" r="2" fill="#C45C4A"/>
                    <!-- 盔纹 -->
                    <path d="M 90 65 Q 120 60 150 65" stroke="#3A3A4A" stroke-width="1" fill="none"/>
                    <path d="M 90 72 Q 120 67 150 72" stroke="#3A3A4A" stroke-width="1" fill="none"/>
                    <!-- 护耳 -->
                    <path d="M 80 80 L 70 95 L 78 100 L 85 90 Z" fill="#5A5A6A"/>
                    <path d="M 160 80 L 170 95 L 162 100 L 155 90 Z" fill="#5A5A6A"/>
                    <!-- 盔带 -->
                    <line x1="80" y1="92" x2="160" y2="92" stroke="${a}" stroke-width="2"/>`;
            
            // === 惠能光头+佛珠 ===
            case 'guangtou':
                return `
                    <!-- 光头（圆顶） -->
                    <path d="M 84 95 Q 84 50 120 48 Q 156 50 156 95 L 156 105 Q 156 100 120 100 Q 84 100 84 105 Z" fill="#D4A878"/>
                    <!-- 头顶的戒疤 -->
                    <circle cx="120" cy="55" r="2" fill="#8B6B3A" opacity="0.6"/>
                    <circle cx="110" cy="65" r="1.5" fill="#8B6B3A" opacity="0.5"/>
                    <circle cx="130" cy="65" r="1.5" fill="#8B6B3A" opacity="0.5"/>
                    <!-- 佛珠挂颈 -->
                    <path d="M 90 110 Q 95 130 120 135 Q 145 130 150 110" stroke="#8B6B3A" stroke-width="2" fill="none"/>
                    <circle cx="95" cy="115" r="2" fill="#8B6B3A"/>
                    <circle cx="110" cy="128" r="2" fill="#8B6B3A"/>
                    <circle cx="130" cy="128" r="2" fill="#8B6B3A"/>
                    <circle cx="145" cy="115" r="2" fill="#8B6B3A"/>`;
            
            // === 屈原高冠 ===
            case 'gaoguan':
                return `
                    <!-- 冠底（贴额横带） -->
                    <rect x="80" y="78" width="80" height="8" fill="${a}"/>
                    <!-- 冠顶（高耸） -->
                    <path d="M 88 78 L 92 40 L 100 35 L 140 35 L 148 40 L 152 78 Z" fill="${a}"/>
                    <!-- 冠顶横梁 -->
                    <line x1="92" y1="40" x2="148" y2="40" stroke="${a2}" stroke-width="2"/>
                    <line x1="92" y1="50" x2="148" y2="50" stroke="${a2}" stroke-width="1"/>
                    <line x1="92" y1="62" x2="148" y2="62" stroke="${a2}" stroke-width="1"/>
                    <!-- 冠顶悬挂的玉珠（重要标志） -->
                    <line x1="100" y1="35" x2="100" y2="22" stroke="${a2}" stroke-width="1.2"/>
                    <line x1="120" y1="35" x2="120" y2="18" stroke="${a2}" stroke-width="1.2"/>
                    <line x1="140" y1="35" x2="140" y2="22" stroke="${a2}" stroke-width="1.2"/>
                    <line x1="105" y1="22" x2="135" y2="22" stroke="${a2}" stroke-width="1.2"/>
                    <line x1="105" y1="18" x2="135" y2="18" stroke="${a2}" stroke-width="1.2"/>
                    <circle cx="100" cy="22" r="2" fill="${a2}"/>
                    <circle cx="120" cy="18" r="2.5" fill="${a2}"/>
                    <circle cx="140" cy="22" r="2" fill="${a2}"/>
                    <!-- 两侧飘带 -->
                    <path d="M 82 82 Q 75 100 78 120" stroke="${a2}" stroke-width="2" fill="none" opacity="0.7"/>
                    <path d="M 158 82 Q 165 100 162 120" stroke="${a2}" stroke-width="2" fill="none" opacity="0.7"/>`;
            
            // === 李商隐软帽 ===
            case 'ruanmao':
                return `
                    <!-- 帽身（圆顶） -->
                    <path d="M 82 80 Q 85 50 120 48 Q 155 50 158 80 L 158 86 L 82 86 Z" fill="${a2}"/>
                    <!-- 帽檐（轻微外翻）-->
                    <path d="M 78 82 Q 75 78 82 76 L 158 76 Q 165 78 162 82 Z" fill="${a}"/>
                    <!-- 帽顶装饰 -->
                    <circle cx="120" cy="60" r="4" fill="${a}"/>
                    <line x1="100" y1="55" x2="115" y2="55" stroke="${a}" stroke-width="1.5"/>
                    <line x1="125" y1="55" x2="140" y2="55" stroke="${a}" stroke-width="1.5"/>`;
            
            // === 孔子儒巾 ===
            case 'rujin':
                return `
                    <!-- 帽身（黑色儒冠）-->
                    <path d="M 82 78 Q 88 48 120 46 Q 152 48 158 78 L 158 86 L 82 86 Z" fill="#1A1A1A"/>
                    <!-- 帽顶（前高后低） -->
                    <path d="M 90 50 L 95 38 L 145 38 L 150 50 Z" fill="#1A1A1A"/>
                    <!-- 帽正（中间玉） -->
                    <rect x="113" y="55" width="14" height="20" fill="${a}"/>
                    <circle cx="120" cy="62" r="3" fill="#FFF" opacity="0.7"/>
                    <circle cx="120" cy="62" r="1.5" fill="${a2}"/>
                    <!-- 帽带 -->
                    <line x1="80" y1="86" x2="160" y2="86" stroke="${a}" stroke-width="2"/>
                    <!-- 帽后飘带 -->
                    <path d="M 90 50 L 88 70" stroke="#1A1A1A" stroke-width="1" opacity="0.5"/>
                    <path d="M 150 50 L 152 70" stroke="#1A1A1A" stroke-width="1" opacity="0.5"/>`;
            
            // === 李白散发 ===
            case 'sanfa':
                return `
                    <!-- 散发（披肩长发） -->
                    <path d="M 78 100 Q 75 60 120 45 Q 165 60 162 100 L 168 150 Q 165 145 145 130 L 95 130 Q 75 145 72 150 Z" fill="${h}"/>
                    <!-- 顶发束带（紫金冠）-->
                    <rect x="98" y="55" width="44" height="10" fill="${a}"/>
                    <circle cx="120" cy="60" r="3" fill="#FFF" opacity="0.8"/>
                    <!-- 额前散发 -->
                    <path d="M 90 80 Q 95 70 105 75" fill="${h}"/>
                    <path d="M 135 75 Q 145 70 150 80" fill="${h}"/>
                    <!-- 两鬓散发（标志性豪放） -->
                    <path d="M 78 100 Q 65 130 60 170" stroke="${h}" stroke-width="6" fill="none" stroke-linecap="round"/>
                    <path d="M 162 100 Q 175 130 180 170" stroke="${h}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
            
            // === 司马迁进贤冠 ===
            case 'jinxian':
                return `
                    <!-- 冠底（黑色硬冠）-->
                    <rect x="80" y="76" width="80" height="14" fill="#1A1A1A"/>
                    <!-- 冠顶（前高后低） -->
                    <path d="M 90 76 L 95 50 L 145 50 L 150 76 Z" fill="#1A1A1A"/>
                    <!-- 冠顶横梁 -->
                    <line x1="95" y1="50" x2="145" y2="50" stroke="${a}" stroke-width="1.5"/>
                    <line x1="100" y1="60" x2="140" y2="60" stroke="${a}" stroke-width="1.5"/>
                    <!-- 冠前悬挂的玉串（标志性） -->
                    <line x1="95" y1="50" x2="95" y2="20" stroke="${a}" stroke-width="1.5"/>
                    <line x1="115" y1="50" x2="115" y2="14" stroke="${a}" stroke-width="1.5"/>
                    <line x1="125" y1="50" x2="125" y2="14" stroke="${a}" stroke-width="1.5"/>
                    <line x1="145" y1="50" x2="145" y2="20" stroke="${a}" stroke-width="1.5"/>
                    <circle cx="95" cy="22" r="2" fill="${a}"/>
                    <circle cx="115" cy="16" r="2.5" fill="${a}"/>
                    <circle cx="125" cy="16" r="2.5" fill="${a}"/>
                    <circle cx="145" cy="22" r="2" fill="${a}"/>
                    <!-- 冠带 -->
                    <line x1="80" y1="90" x2="160" y2="90" stroke="${a}" stroke-width="2"/>`;
            
            // === 孟母发髻（女性简单发式）===
            case 'faji':
                return `
                    <!-- 顶髻（圆形发包）-->
                    <ellipse cx="120" cy="55" rx="22" ry="16" fill="${h}"/>
                    <!-- 髻底发带 -->
                    <rect x="100" y="68" width="40" height="4" fill="${a}"/>
                    <!-- 两侧发髻 -->
                    <ellipse cx="100" cy="78" rx="8" ry="10" fill="${h}"/>
                    <ellipse cx="140" cy="78" rx="8" ry="10" fill="${h}"/>
                    <!-- 簪子 -->
                    <line x1="115" y1="48" x2="125" y2="40" stroke="${a}" stroke-width="2"/>
                    <circle cx="125" cy="40" r="2" fill="${a}"/>
                    <!-- 刘海 -->
                    <path d="M 90 85 Q 100 78 110 85" fill="${h}" opacity="0.8"/>
                    <path d="M 130 85 Q 140 78 150 85" fill="${h}" opacity="0.8"/>`;
            
            // === 班固乌纱帽（唐代官帽）===
            case 'wusha':
                return `
                    <!-- 帽身（黑色硬壳）-->
                    <path d="M 82 78 Q 86 50 120 48 Q 154 50 158 78 L 158 88 L 82 88 Z" fill="#1A1A1A"/>
                    <!-- 帽顶（微凸） -->
                    <ellipse cx="120" cy="52" rx="28" ry="6" fill="#1A1A1A"/>
                    <!-- 帽耳（两侧微微上翘）-->
                    <path d="M 82 80 L 75 70 L 82 76 Z" fill="#1A1A1A"/>
                    <path d="M 158 80 L 165 70 L 158 76 Z" fill="#1A1A1A"/>
                    <!-- 帽正（金色装饰） -->
                    <rect x="113" y="60" width="14" height="14" fill="${a}"/>
                    <circle cx="120" cy="67" r="3" fill="#FFF" opacity="0.7"/>
                    <!-- 帽带（官带） -->
                    <line x1="80" y1="88" x2="160" y2="88" stroke="${a}" stroke-width="2.5"/>
                    <!-- 帽后飘带（官带末端） -->
                    <path d="M 90 88 L 85 105" stroke="${a}" stroke-width="2"/>
                    <path d="M 150 88 L 155 105" stroke="${a}" stroke-width="2"/>`;
            
            // === 长孙皇后凤冠 ===
            case 'fengguan':
                return `
                    <!-- 冠底（贴额带）-->
                    <path d="M 80 78 Q 120 75 160 78 L 160 86 L 80 86 Z" fill="${a}"/>
                    <!-- 冠顶（多翅凤冠）-->
                    <path d="M 90 78 L 88 35 L 152 35 L 150 78 Z" fill="${a}"/>
                    <!-- 凤翅（两侧展开） -->
                    <path d="M 88 50 L 70 40 L 75 50 L 65 55 L 78 60 Z" fill="${a2}"/>
                    <path d="M 152 50 L 170 40 L 165 50 L 175 55 L 162 60 Z" fill="${a2}"/>
                    <!-- 冠顶金凤（简化）-->
                    <ellipse cx="120" cy="30" rx="12" ry="8" fill="${a2}"/>
                    <path d="M 120 25 L 115 15 L 125 15 Z" fill="${a2}"/>
                    <path d="M 110 30 Q 100 25 95 35" stroke="${a2}" stroke-width="1.5" fill="none"/>
                    <path d="M 130 30 Q 140 25 145 35" stroke="${a2}" stroke-width="1.5" fill="none"/>
                    <!-- 冠上悬挂的珠串 -->
                    <line x1="100" y1="78" x2="100" y2="60" stroke="${a2}" stroke-width="0.8"/>
                    <line x1="120" y1="78" x2="120" y2="55" stroke="${a2}" stroke-width="0.8"/>
                    <line x1="140" y1="78" x2="140" y2="60" stroke="${a2}" stroke-width="0.8"/>
                    <circle cx="100" cy="62" r="1.5" fill="${a2}"/>
                    <circle cx="120" cy="58" r="2" fill="${a2}"/>
                    <circle cx="140" cy="62" r="1.5" fill="${a2}"/>
                    <!-- 额前刘海 -->
                    <path d="M 90 88 Q 100 82 110 88" fill="${h}" opacity="0.7"/>`;
            
            // === 鲁智深光头+戒疤 ===
            case 'guangtou2':
                return `
                    <!-- 粗犷光头 -->
                    <path d="M 82 95 Q 82 48 120 46 Q 158 48 158 95 L 158 105 Q 158 100 120 100 Q 82 100 82 105 Z" fill="#C49868"/>
                    <!-- 戒疤（多个） -->
                    <circle cx="120" cy="55" r="2" fill="#6B4A2A"/>
                    <circle cx="105" cy="60" r="1.8" fill="#6B4A2A"/>
                    <circle cx="135" cy="60" r="1.8" fill="#6B4A2A"/>
                    <circle cx="115" cy="48" r="1.5" fill="#6B4A2A"/>
                    <circle cx="125" cy="48" r="1.5" fill="#6B4A2A"/>
                    <!-- 眉头紧锁纹 -->
                    <path d="M 95 75 Q 105 73 115 78" stroke="#6B4A2A" stroke-width="1.2" fill="none"/>
                    <path d="M 145 75 Q 135 73 125 78" stroke="#6B4A2A" stroke-width="1.2" fill="none"/>
                    <!-- 颈上佛珠（粗） -->
                    <path d="M 88 115 Q 90 135 120 140 Q 150 135 152 115" stroke="#6B4A2A" stroke-width="3" fill="none"/>
                    <circle cx="92" cy="120" r="3" fill="#6B4A2A"/>
                    <circle cx="105" cy="132" r="3" fill="#6B4A2A"/>
                    <circle cx="120" cy="138" r="3.5" fill="#6B4A2A"/>
                    <circle cx="135" cy="132" r="3" fill="#6B4A2A"/>
                    <circle cx="148" cy="120" r="3" fill="#6B4A2A"/>`;
            
            // === 王维软帽（变体）===
            case 'ruanmao2':
                return `
                    <!-- 帽身（圆顶） -->
                    <path d="M 82 80 Q 86 50 120 48 Q 154 50 158 80 L 158 86 L 82 86 Z" fill="${a}"/>
                    <!-- 帽檐（外翻更明显）-->
                    <path d="M 78 82 Q 75 76 82 74 L 158 74 Q 165 76 162 82 Z" fill="${a2}"/>
                    <!-- 帽顶折线 -->
                    <path d="M 95 58 Q 120 52 145 58" stroke="${a2}" stroke-width="1.5" fill="none"/>
                    <path d="M 100 65 Q 120 60 140 65" stroke="${a2}" stroke-width="1" fill="none"/>
                    <!-- 帽后系带 -->
                    <path d="M 95 86 L 92 100" stroke="${a2}" stroke-width="1.5" fill="none"/>
                    <path d="M 145 86 L 148 100" stroke="${a2}" stroke-width="1.5" fill="none"/>`;
            
            // === 霍去病战盔（年轻版）===
            case 'zhankui2':
                return `
                    <!-- 盔身（更亮）-->
                    <path d="M 80 80 Q 80 48 120 46 Q 160 48 160 80 L 162 92 L 78 92 Z" fill="#7A7A8A"/>
                    <!-- 盔顶（尖）-->
                    <path d="M 90 48 Q 95 32 120 30 Q 145 32 150 48 Z" fill="#8A8A9A"/>
                    <!-- 红缨（更高）-->
                    <path d="M 120 30 L 110 12 L 115 18 L 120 8 L 125 18 L 130 12 Z" fill="#D45A4A"/>
                    <path d="M 120 8 L 120 0" stroke="#D45A4A" stroke-width="2.5"/>
                    <circle cx="120" cy="0" r="3" fill="#D45A4A"/>
                    <!-- 护颊（年轻版更轻）-->
                    <path d="M 80 82 L 75 95 L 82 100 L 88 88 Z" fill="#7A7A8A"/>
                    <path d="M 160 82 L 165 95 L 158 100 L 152 88 Z" fill="#7A7A8A"/>
                    <!-- 金色盔纹 -->
                    <path d="M 90 65 Q 120 60 150 65" stroke="${a}" stroke-width="1.5" fill="none"/>
                    <path d="M 90 75 Q 120 70 150 75" stroke="${a}" stroke-width="1" fill="none"/>`;
            
            // === 杨贵妃高髻 ===
            case 'gaoji':
                return `
                    <!-- 顶髻（高耸）-->
                    <ellipse cx="120" cy="45" rx="25" ry="22" fill="${h}"/>
                    <!-- 顶髻分片 -->
                    <path d="M 100 35 Q 120 30 140 35" stroke="${h}" stroke-width="0.5" opacity="0.5" fill="none"/>
                    <path d="M 95 50 Q 120 45 145 50" stroke="${h}" stroke-width="0.5" opacity="0.5" fill="none"/>
                    <!-- 顶髻装饰（步摇簪） -->
                    <line x1="120" y1="25" x2="125" y2="10" stroke="${a}" stroke-width="2"/>
                    <circle cx="125" cy="10" r="2" fill="${a}"/>
                    <line x1="123" y1="12" x2="128" y2="5" stroke="${a2}" stroke-width="1"/>
                    <line x1="120" y1="15" x2="115" y2="8" stroke="${a}" stroke-width="1.5"/>
                    <circle cx="115" cy="8" r="1.5" fill="${a}"/>
                    <!-- 两侧发髻 -->
                    <ellipse cx="100" cy="70" rx="12" ry="14" fill="${h}"/>
                    <ellipse cx="140" cy="70" rx="12" ry="14" fill="${h}"/>
                    <!-- 簪钗 -->
                    <line x1="105" y1="68" x2="115" y2="60" stroke="${a}" stroke-width="1.5"/>
                    <line x1="135" y1="68" x2="125" y2="60" stroke="${a}" stroke-width="1.5"/>
                    <circle cx="115" cy="60" r="2" fill="${a}"/>
                    <circle cx="125" cy="60" r="2" fill="${a}"/>
                    <!-- 额前刘海（花钿） -->
                    <path d="M 88 90 Q 100 82 110 90" fill="${h}" opacity="0.7"/>
                    <path d="M 130 90 Q 140 82 152 90" fill="${h}" opacity="0.7"/>
                    <!-- 花钿（额头中央装饰）-->
                    <circle cx="120" cy="86" r="2.5" fill="${a}"/>
                    <circle cx="120" cy="86" r="1" fill="#FFF" opacity="0.8"/>`;
            
            default:
                return `<path d="M 82 78 Q 88 50 120 48 Q 152 50 158 78 Z" fill="${h}"/>`;
        }
    }
    
    /**
     * 五官（统一脸型，但眉毛/眼睛/嘴型不同）
     */
    function renderFace(p) {
        const h = p.hair;
        return `
            <!-- 眉毛 -->
            <path d="M 96 88 Q 105 84 114 90" stroke="${h}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <path d="M 126 90 Q 135 84 144 88" stroke="${h}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
            <!-- 眼睛 -->
            <ellipse cx="105" cy="98" rx="5" ry="3" fill="#FFF"/>
            <ellipse cx="135" cy="98" rx="5" ry="3" fill="#FFF"/>
            <circle cx="106" cy="98" r="2.5" fill="${h}"/>
            <circle cx="136" cy="98" r="2.5" fill="${h}"/>
            <circle cx="107" cy="97" r="0.8" fill="#FFF"/>
            <circle cx="137" cy="97" r="0.8" fill="#FFF"/>
            <!-- 鼻 -->
            <path d="M 118 105 Q 120 113 122 105" stroke="${p.accent2}" stroke-width="1" fill="none" opacity="0.5"/>
            <!-- 嘴（微笑）-->
            <path d="M 112 122 Q 120 127 128 122" stroke="${h}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
            <path d="M 114 122 Q 120 125 126 122" fill="#C45C4A" opacity="0.5"/>
            <!-- 脸颊红晕 -->
            <circle cx="92" cy="110" r="5" fill="#E8A0A0" opacity="0.3"/>
            <circle cx="148" cy="110" r="5" fill="#E8A0A0" opacity="0.3"/>
            <!-- 耳朵 -->
            <ellipse cx="84" cy="100" rx="3" ry="6" fill="${p.skin}" opacity="0.8"/>
            <ellipse cx="156" cy="100" rx="3" ry="6" fill="${p.skin}" opacity="0.8"/>`;
    }
    
    /**
     * 胡须
     */
    function renderBeard(style, p) {
        const h = p.hair;
        switch(style) {
            case 'long': // 诸葛亮、苏轼、司马迁、班固、岳飞、屈原
                return `
                    <path d="M 110 130 Q 113 145 115 155 Q 117 165 120 170 Q 123 165 125 155 Q 127 145 130 130" fill="${h}" opacity="0.85"/>
                    <path d="M 108 128 Q 110 138 112 148" stroke="${h}" stroke-width="1.5" fill="none" opacity="0.7"/>
                    <path d="M 132 128 Q 130 138 128 148" stroke="${h}" stroke-width="1.5" fill="none" opacity="0.7"/>
                    <!-- 须尖 -->
                    <path d="M 120 170 L 118 178" stroke="${h}" stroke-width="1.5"/>
                    <path d="M 120 170 L 122 178" stroke="${h}" stroke-width="1.5"/>`;
            case 'short': // 李白、李商隐、王维
                return `<path d="M 113 130 Q 120 138 127 130 L 124 138 Q 120 140 116 138 Z" fill="${h}" opacity="0.7"/>`;
            case 'wild': // 鲁智深（络腮胡）
                return `
                    <path d="M 88 110 Q 85 130 95 145 L 100 150 L 100 130 Z" fill="${h}" opacity="0.85"/>
                    <path d="M 152 110 Q 155 130 145 145 L 140 150 L 140 130 Z" fill="${h}" opacity="0.85"/>
                    <path d="M 95 130 Q 100 145 110 152 Q 120 158 130 152 Q 140 145 145 130 L 142 145 Q 130 155 120 158 Q 110 155 98 145 Z" fill="${h}" opacity="0.9"/>
                    <path d="M 100 130 Q 102 138 105 142" stroke="${h}" stroke-width="1" fill="none" opacity="0.6"/>
                    <path d="M 140 130 Q 138 138 135 142" stroke="${h}" stroke-width="1" fill="none" opacity="0.6"/>`;
            default:
                return '';
        }
    }
    
    /**
     * 手持物 — 每型的第二识别符号
     */
    function renderProp(prop, p) {
        switch(prop) {
            // === 羽扇（诸葛亮）— 最显眼的特征 ===
            case 'yushan':
                return `
                    <g transform="translate(45 230)">
                        <!-- 扇柄 -->
                        <line x1="0" y1="0" x2="0" y2="70" stroke="#5A4A3A" stroke-width="4" stroke-linecap="round"/>
                        <line x1="0" y1="0" x2="0" y2="70" stroke="#8B6B3A" stroke-width="2.5" stroke-linecap="round"/>
                        <!-- 扇头（羽毛扇，9根羽毛展开）-->
                        <g transform="translate(0 -10)">
                            <ellipse cx="0" cy="-15" rx="35" ry="25" fill="#F5E6D3" stroke="${p.hair}" stroke-width="1.5"/>
                            <!-- 羽毛分割线 -->
                            <line x1="0" y1="-15" x2="-30" y2="-20" stroke="${p.hair}" stroke-width="1" opacity="0.7"/>
                            <line x1="0" y1="-15" x2="-22" y2="-30" stroke="${p.hair}" stroke-width="1" opacity="0.7"/>
                            <line x1="0" y1="-15" x2="-12" y2="-36" stroke="${p.hair}" stroke-width="1" opacity="0.7"/>
                            <line x1="0" y1="-15" x2="0" y2="-38" stroke="${p.hair}" stroke-width="1" opacity="0.7"/>
                            <line x1="0" y1="-15" x2="12" y2="-36" stroke="${p.hair}" stroke-width="1" opacity="0.7"/>
                            <line x1="0" y1="-15" x2="22" y2="-30" stroke="${p.hair}" stroke-width="1" opacity="0.7"/>
                            <line x1="0" y1="-15" x2="30" y2="-20" stroke="${p.hair}" stroke-width="1" opacity="0.7"/>
                            <!-- 羽轴纹 -->
                            <ellipse cx="-18" cy="-22" rx="6" ry="10" fill="#FFF" opacity="0.4"/>
                            <ellipse cx="-8" cy="-28" rx="5" ry="9" fill="#FFF" opacity="0.4"/>
                            <ellipse cx="8" cy="-28" rx="5" ry="9" fill="#FFF" opacity="0.4"/>
                            <ellipse cx="18" cy="-22" rx="6" ry="10" fill="#FFF" opacity="0.4"/>
                            <ellipse cx="0" cy="-30" rx="4" ry="8" fill="#FFF" opacity="0.4"/>
                            <!-- 扇坠 -->
                            <line x1="0" y1="0" x2="0" y2="8" stroke="${p.accent}" stroke-width="1.5"/>
                            <circle cx="0" cy="10" r="2" fill="${p.accent}"/>
                        </g>
                    </g>`;
            
            // === 竹杖（苏轼）===
            case 'zhuzhang':
                return `
                    <g transform="translate(45 220)">
                        <line x1="0" y1="0" x2="0" y2="100" stroke="#8B6B3A" stroke-width="4" stroke-linecap="round"/>
                        <line x1="0" y1="0" x2="0" y2="100" stroke="#A88B5A" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
                        <!-- 竹节 -->
                        <line x1="-3" y1="20" x2="3" y2="20" stroke="#5A4A2A" stroke-width="1.5"/>
                        <line x1="-3" y1="45" x2="3" y2="45" stroke="#5A4A2A" stroke-width="1.5"/>
                        <line y1="70" x2="3" y2="70" stroke="#5A4A2A" stroke-width="1.5"/>
                        <!-- 杖顶 -->
                        <ellipse cx="0" cy="-3" rx="5" ry="4" fill="#5A4A2A"/>
                        <ellipse cx="0" cy="-3" rx="3" ry="2" fill="#8B6B3A"/>
                    </g>`;
            
            // === 长枪（岳飞）===
            case 'changqiang':
                return `
                    <g transform="translate(45 180)">
                        <rect x="-1.5" y="0" width="3" height="140" fill="#5A4A3A"/>
                        <!-- 枪头 -->
                        <polygon points="0,-40 -8,0 8,0" fill="#C0C0C8" stroke="${p.accent2}" stroke-width="1"/>
                        <polygon points="0,-40 -5,-25 0,-30 5,-25" fill="#FFF" opacity="0.5"/>
                        <!-- 红缨 -->
                        <path d="M -8 0 Q -15 15 -10 30" stroke="#C45C4A" stroke-width="3" fill="none"/>
                        <path d="M 8 0 Q 15 15 10 30" stroke="#C45C4A" stroke-width="3" fill="none"/>
                        <path d="M 0 0 L 0 25" stroke="#C45C4A" stroke-width="3"/>
                    </g>`;
            
            // === 拂尘（惠能）===
            case 'fuchen':
                return `
                    <g transform="translate(45 220)">
                        <line x1="0" y1="0" x2="0" y2="60" stroke="#5A4A3A" stroke-width="3"/>
                        <circle cx="0" cy="0" r="5" fill="#5A4A3A"/>
                        <circle cx="0" cy="0" r="2" fill="${p.accent}"/>
                        <!-- 尘丝 -->
                        <path d="M 0 -2 Q -10 -15 -15 -30" stroke="#F5E6D3" stroke-width="1.5" fill="none" opacity="0.9"/>
                        <path d="M 0 -2 Q -5 -15 -8 -32" stroke="#F5E6D3" stroke-width="1.5" fill="none" opacity="0.9"/>
                        <path d="M 0 -2 Q 0 -18 0 -35" stroke="#F5E6D3" stroke-width="1.5" fill="none" opacity="0.9"/>
                        <path d="M 0 -2 Q 5 -15 8 -32" stroke="#F5E6D3" stroke-width="1.5" fill="none" opacity="0.9"/>
                        <path d="M 0 -2 Q 10 -15 15 -30" stroke="#F5E6D3" stroke-width="1.5" fill="none" opacity="0.9"/>
                    </g>`;
            
            // === 兰草（屈原）===
            case 'lancao':
                return `
                    <g transform="translate(195 240)">
                        <!-- 茎 -->
                        <path d="M 0 30 Q -3 10 -5 -5 Q -3 0 0 30" stroke="${p.accent}" stroke-width="2" fill="none"/>
                        <path d="M 0 30 Q 0 10 0 -10" stroke="${p.accent}" stroke-width="2" fill="none"/>
                        <path d="M 0 30 Q 3 10 5 -5" stroke="${p.accent}" stroke-width="2" fill="none"/>
                        <!-- 叶（细长）-->
                        <path d="M -5 -5 Q -15 -15 -20 -10 Q -15 -5 -5 -5" fill="${p.accent}" opacity="0.85"/>
                        <path d="M 0 -10 Q -5 -20 -10 -18 Q -5 -15 0 -10" fill="${p.accent}" opacity="0.85"/>
                        <path d="M 0 -10 Q 5 -20 10 -18 Q 5 -15 0 -10" fill="${p.accent}" opacity="0.85"/>
                        <path d="M 5 -5 Q 15 -15 20 -10 Q 15 -5 5 -5" fill="${p.accent}" opacity="0.85"/>
                        <path d="M 0 -15 Q -3 -22 -2 -25" fill="${p.accent}" opacity="0.85"/>
                        <!-- 花苞 -->
                        <ellipse cx="0" cy="-20" rx="2" ry="3" fill="${p.accent2}"/>
                    </g>`;
            
            // === 诗卷（李商隐）===
            case 'shijuan':
                return `
                    <g transform="translate(50 240)">
                        <!-- 卷轴主体 -->
                        <ellipse cx="0" cy="0" rx="22" ry="8" fill="#F5E6D3" stroke="${p.hair}" stroke-width="1.5"/>
                        <!-- 卷轴端头 -->
                        <ellipse cx="-22" cy="0" rx="5" ry="9" fill="${p.accent}" stroke="${p.hair}" stroke-width="1"/>
                        <ellipse cx="22" cy="0" rx="5" ry="9" fill="${p.accent}" stroke="${p.hair}" stroke-width="1"/>
                        <!-- 卷中文字（细线）-->
                        <line x1="-18" y1="-2" x2="18" y2="-2" stroke="${p.hair}" stroke-width="0.5" opacity="0.5"/>
                        <line x1="-15" y1="0" x2="15" y2="0" stroke="${p.hair}" stroke-width="0.5" opacity="0.5"/>
                        <line x1="-18" y1="2" x2="18" y2="2" stroke="${p.hair}" stroke-width="0.5" opacity="0.5"/>
                        <!-- 飘带 -->
                        <path d="M 25 0 Q 32 10 28 18" stroke="${p.accent2}" stroke-width="2" fill="none" opacity="0.7"/>
                    </g>`;
            
            // === 竹简（孔子）===
            case 'zhujian':
                return `
                    <g transform="translate(50 230)">
                        <!-- 简册 -->
                        <rect x="-15" y="-25" width="30" height="50" fill="#D4B080" stroke="${p.hair}" stroke-width="1.5"/>
                        <rect x="-15" y="-25" width="30" height="4" fill="${p.accent}"/>
                        <rect x="-15" y="21" width="30" height="4" fill="${p.accent}"/>
                        <!-- 简文 -->
                        <line x1="-10" y1="-15" x2="10" y2="-15" stroke="${p.hair}" stroke-width="0.5" opacity="0.6"/>
                        <line x1="-10" y1="-8" x2="10" y2="-8" stroke="${p.hair}" stroke-width="0.5" opacity="0.6"/>
                        <line x1="-10" y1="-1" x2="10" y2="-1" stroke="${p.hair}" stroke-width="0.5" opacity="0.6"/>
                        <line x1="-10" y1="6" x2="10" y2="6" stroke="${p.hair}" stroke-width="0.5" opacity="0.6"/>
                        <line x1="-10" y1="13" x2="10" y2="13" stroke="${p.hair}" stroke-width="0.5" opacity="0.6"/>
                        <!-- 编绳 -->
                        <line x1="-15" y1="-12" x2="15" y2="-12" stroke="${p.accent2}" stroke-width="1.5"/>
                        <line x1="-15" y1="2" x2="15" y2="2" stroke="${p.accent2}" stroke-width="1.5"/>
                        <line x1="-15" y1="16" x2="15" y2="16" stroke="${p.accent2}" stroke-width="1.5"/>
                    </g>`;
            
            // === 酒壶（李白）===
            case 'jiuhu':
                return `
                    <g transform="translate(45 245)">
                        <!-- 壶身 -->
                        <path d="M -15 0 Q -18 25 -10 40 Q 0 45 10 40 Q 18 25 15 0 Q 12 -10 0 -10 Q -12 -10 -15 0 Z" fill="${p.accent}" stroke="${p.hair}" stroke-width="1.5"/>
                        <!-- 壶口 -->
                        <rect x="-7" y="-15" width="14" height="6" fill="${p.accent2}" stroke="${p.hair}" stroke-width="1"/>
                        <ellipse cx="0" cy="-15" rx="7" ry="2" fill="${p.hair}"/>
                        <!-- 壶把 -->
                        <path d="M 15 0 Q 25 5 22 20 Q 18 25 15 25" stroke="${p.hair}" stroke-width="2" fill="none"/>
                        <!-- 壶嘴 -->
                        <path d="M -15 -5 Q -22 -8 -20 -15" stroke="${p.hair}" stroke-width="1.5" fill="none"/>
                        <!-- 装饰带 -->
                        <rect x="-13" y="5" width="26" height="3" fill="${p.accent2}"/>
                        <rect x="-13" y="20" width="26" height="3" fill="${p.accent2}"/>
                        <!-- 壶中酒（液面）-->
                        <ellipse cx="0" cy="25" rx="9" ry="2" fill="#E8C060" opacity="0.7"/>
                    </g>`;
            
            // === 毛笔（司马迁）===
            case 'maobi':
                return `
                    <g transform="translate(45 230)">
                        <!-- 笔杆 -->
                        <rect x="-2" y="0" width="4" height="55" fill="#5A4A3A"/>
                        <line x1="-2" y1="0" x2="2" y2="0" stroke="${p.accent}" stroke-width="1"/>
                        <!-- 笔管装饰 -->
                        <rect x="-3" y="5" width="6" height="3" fill="${p.accent}"/>
                        <rect x="-3" y="20" width="6" height="2" fill="${p.accent2}"/>
                        <rect x="-3" y="40" width="6" height="3" fill="${p.accent}"/>
                        <!-- 笔锋 -->
                        <path d="M -2 55 L 0 75 L 2 55 Z" fill="${p.hair}"/>
                        <path d="M -2 55 L -1 72" stroke="#FFF" stroke-width="0.5" opacity="0.5"/>
                    </g>`;
            
            // === 织梭（孟母）===
            case 'zhisuo':
                return `
                    <g transform="translate(50 240)">
                        <!-- 梭身（菱形）-->
                        <path d="M -18 -3 L 18 5 L 18 15 L -18 7 Z" fill="${p.accent}" stroke="${p.hair}" stroke-width="1.5"/>
                        <!-- 梭尖 -->
                        <line x1="-18" y1="-3" x2="-25" y2="0" stroke="${p.hair}" stroke-width="1.5"/>
                        <line x1="-18" y1="7" x2="-25" y2="10" stroke="${p.hair}" stroke-width="1.5"/>
                        <line x1="18" y1="5" x2="25" y2="3" stroke="${p.hair}" stroke-width="1.5"/>
                        <line x1="18" y1="15" x2="25" y2="17" stroke="${p.hair}" stroke-width="1.5"/>
                        <!-- 丝线 -->
                        <path d="M -25 0 Q -35 10 -50 5" stroke="${p.accent2}" stroke-width="1" fill="none" opacity="0.7"/>
                        <path d="M 25 3 Q 35 0 50 -5" stroke="${p.accent2}" stroke-width="1" fill="none" opacity="0.7"/>
                    </g>`;
            
            // === 印绶（班固）===
            case 'yinshou':
                return `
                    <g transform="translate(50 235)">
                        <!-- 印章 -->
                        <rect x="-14" y="-14" width="28" height="28" fill="${p.accent}" stroke="${p.hair}" stroke-width="1.5"/>
                        <!-- 印钮 -->
                        <rect x="-6" y="-18" width="12" height="6" fill="${p.accent2}"/>
                        <ellipse cx="0" cy="-18" rx="6" ry="2" fill="${p.accent}"/>
                        <!-- 印文（篆体简化） -->
                        <text x="0" y="5" font-family="serif" font-size="12" fill="#FFF" text-anchor="middle" font-weight="bold">令</text>
                        <!-- 印绶（带子） -->
                        <line x1="-14" y1="14" x2="-14" y2="35" stroke="${p.accent2}" stroke-width="2"/>
                        <line x1="14" y1="14" x2="14" y2="35" stroke="${p.accent2}" stroke-width="2"/>
                        <line x1="-14" y1="14" x2="14" y2="14" stroke="${p.accent2}" stroke-width="2"/>
                        <!-- 绶穗 -->
                        <circle cx="-14" cy="38" r="3" fill="${p.accent2}"/>
                        <circle cx="14" cy="38" r="3" fill="${p.accent2}"/>
                        <path d="M -14 41 L -18 50 M -14 41 L -10 50" stroke="${p.accent2}" stroke-width="1.5"/>
                        <path d="M 14 41 L 10 50 M 14 41 L 18 50" stroke="${p.accent2}" stroke-width="1.5"/>
                    </g>`;
            
            // === 玉如意（长孙皇后）===
            case 'yuruyi':
                return `
                    <g transform="translate(50 230)">
                        <!-- 如意头（灵芝形）-->
                        <path d="M -5 -20 Q -20 -15 -15 0 Q -10 10 0 12 Q 10 10 15 0 Q 20 -15 5 -20 Q 0 -22 -5 -20" fill="${p.accent}" stroke="${p.hair}" stroke-width="1.5"/>
                        <!-- 如意纹 -->
                        <circle cx="0" cy="-5" r="3" fill="${p.accent2}"/>
                        <path d="M -5 -5 Q 0 -8 5 -5" stroke="${p.hair}" stroke-width="0.8" fill="none"/>
                        <!-- 柄 -->
                        <line x1="0" y1="12" x2="0" y2="50" stroke="#5A4A3A" stroke-width="3"/>
                        <line x1="0" y1="12" x2="0" y2="50" stroke="#A88B5A" stroke-width="1.5" opacity="0.6"/>
                        <!-- 柄端 -->
                        <ellipse cx="0" cy="50" rx="4" ry="3" fill="${p.accent2}"/>
                    </g>`;
            
            // === 禅杖（鲁智深）— 粗大 ===
            case 'chanzhang':
                return `
                    <g transform="translate(45 180)">
                        <line x1="0" y1="0" x2="0" y2="140" stroke="#3A2A1A" stroke-width="6" stroke-linecap="round"/>
                        <line x1="0" y1="0" x2="0" y2="140" stroke="#6A4A2A" stroke-width="3" stroke-linecap="round"/>
                        <!-- 杖首（四环）-->
                        <ellipse cx="0" cy="-2" rx="8" ry="5" fill="#6A4A2A" stroke="#3A2A1A" stroke-width="1.5"/>
                        <ellipse cx="0" cy="-8" rx="6" ry="4" fill="#6A4A2A" stroke="#3A2A1A" stroke-width="1.5"/>
                        <!-- 环 -->
                        <ellipse cx="0" cy="-12" rx="10" ry="3" fill="none" stroke="#3A2A1A" stroke-width="2"/>
                        <ellipse cx="0" cy="-18" rx="9" ry="3" fill="none" stroke="#3A2A1A" stroke-width="2"/>
                        <ellipse cx="0" cy="-24" rx="8" ry="2.5" fill="none" stroke="#3A2A1A" stroke-width="2"/>
                        <!-- 铁箍 -->
                        <line x1="-4" y1="30" x2="4" y2="30" stroke="#3A2A1A" stroke-width="2"/>
                        <line x1="-4" y1="70" x2="4" y2="70" stroke="#3A2A1A" stroke-width="2"/>
                        <line x1="-4" y1="110" x2="4" y2="110" stroke="#3A2A1A" stroke-width="2"/>
                    </g>`;
            
            // === 古琴（王维）===
            case 'guqin':
                return `
                    <g transform="translate(45 245)">
                        <rect x="-22" y="-5" width="44" height="10" fill="#5A4A3A" stroke="${p.hair}" stroke-width="1.2" rx="2"/>
                        <!-- 琴面纹理 -->
                        <line x1="-18" y1="-3" x2="18" y2="-3" stroke="${p.accent}" stroke-width="0.5" opacity="0.5"/>
                        <line x1="-18" y1="3" x2="18" y2="3" stroke="${p.accent}" stroke-width="0.5" opacity="0.5"/>
                        <!-- 琴徽（七枚）-->
                        <circle cx="-15" cy="0" r="1.5" fill="${p.accent}"/>
                        <circle cx="-10" cy="0" r="1.5" fill="${p.accent}"/>
                        <circle cx="-5" cy="0" r="1.5" fill="${p.accent}"/>
                        <circle cx="0" cy="0" r="1.5" fill="${p.accent}"/>
                        <circle cx="5" cy="0" r="1.5" fill="${p.accent}"/>
                        <circle cx="10" cy="0" r="1.5" fill="${p.accent}"/>
                        <circle cx="15" cy="0" r="1.5" fill="${p.accent}"/>
                        <!-- 琴弦 -->
                        <line x1="-20" y1="-3" x2="20" y2="-3" stroke="#F5E6D3" stroke-width="0.4" opacity="0.7"/>
                        <line x1="-20" y1="-1" x2="20" y2="-1" stroke="#F5E6D3" stroke-width="0.4" opacity="0.7"/>
                        <line x1="-20" y1="1" x2="20" y2="1" stroke="#F5E6D3" stroke-width="0.4" opacity="0.7"/>
                        <line x1="-20" y1="3" x2="20" y2="3" stroke="#F5E6D3" stroke-width="0.4" opacity="0.7"/>
                        <!-- 琴足 -->
                        <rect x="-4" y="5" width="2" height="6" fill="#3A2A1A"/>
                        <rect x="2" y="5" width="2" height="6" fill="#3A2A1A"/>
                    </g>`;
            
            // === 长弓（霍去病）===
            case 'changgong':
                return `
                    <g transform="translate(50 220)">
                        <!-- 弓身（弯曲）-->
                        <path d="M -25 0 Q -30 -50 0 -55 Q 30 -50 25 0" fill="none" stroke="#5A2A1A" stroke-width="3"/>
                        <path d="M -25 0 Q -30 -50 0 -55 Q 30 -50 25 0" fill="none" stroke="#8B4A2A" stroke-width="1.5"/>
                        <!-- 弓弦 -->
                        <line x1="-25" y1="0" x2="25" y2="0" stroke="#F5E6D3" stroke-width="0.8" opacity="0.9"/>
                        <!-- 弓梢 -->
                        <circle cx="-25" cy="0" r="2" fill="#3A1A0A"/>
                        <circle cx="25" cy="0" r="2" fill="#3A1A0A"/>
                    </g>`;
            
            // === 牡丹（杨贵妃）===
            case 'mudan':
                return `
                    <g transform="translate(45 240)">
                        <!-- 茎叶 -->
                        <line x1="0" y1="0" x2="0" y2="40" stroke="#5A8A4A" stroke-width="1.5"/>
                        <ellipse cx="-8" cy="30" rx="6" ry="3" fill="#5A8A4A" transform="rotate(-30 -8 30)"/>
                        <ellipse cx="8" cy="25" rx="6" ry="3" fill="#5A8A4A" transform="rotate(30 8 25)"/>
                        <!-- 主花（大牡丹）-->
                        <g transform="translate(0 -5)">
                            <!-- 外层花瓣 -->
                            <ellipse cx="-12" cy="0" rx="9" ry="6" fill="${p.accent2}" opacity="0.85" transform="rotate(-30 -12 0)"/>
                            <ellipse cx="12" cy="0" rx="9" ry="6" fill="${p.accent2}" opacity="0.85" transform="rotate(30 12 0)"/>
                            <ellipse cx="0" cy="-12" rx="9" ry="6" fill="${p.accent2}" opacity="0.85"/>
                            <ellipse cx="0" cy="12" rx="9" ry="6" fill="${p.accent2}" opacity="0.85"/>
                            <ellipse cx="-10" cy="-10" rx="8" ry="5" fill="${p.accent2}" opacity="0.9" transform="rotate(-45 -10 -10)"/>
                            <ellipse cx="10" cy="-10" rx="8" ry="5" fill="${p.accent2}" opacity="0.9" transform="rotate(45 10 -10)"/>
                            <!-- 中层花瓣 -->
                            <ellipse cx="-6" cy="0" rx="6" ry="4" fill="${p.accent}" opacity="0.95" transform="rotate(-30 -6 0)"/>
                            <ellipse cx="6" cy="0" rx="6" ry="4" fill="${p.accent}" opacity="0.95" transform="rotate(30 6 0)"/>
                            <ellipse cx="0" cy="-6" rx="6" ry="4" fill="${p.accent}"/>
                            <ellipse cx="0" cy="6" rx="6" ry="4" fill="${p.accent}"/>
                            <!-- 花心 -->
                            <circle cx="0" cy="0" r="4" fill="${p.accent}"/>
                            <circle cx="-1" cy="-1" r="1" fill="#FFF" opacity="0.8"/>
                        </g>
                        <!-- 侧花苞 -->
                        <ellipse cx="-15" cy="-10" rx="4" ry="6" fill="${p.accent2}" opacity="0.7" transform="rotate(-20 -15 -10)"/>
                    </g>`;
            
            default:
                return '';
        }
    }
    
    /**
     * 预加载所有 SVG 为 Image 对象
     */
    function preloadAllImages() {
        const images = {};
        Object.keys(characters).forEach(type => {
            const svg = getCharacterSVG(type);
            const blob = new Blob([svg], {type: 'image/svg+xml'});
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.src = url;
            images[type] = img;
        });
        return images;
    }
    
    return {
        getSVG: getCharacterSVG,
        preload: preloadAllImages,
        characters: characters
    };
})();
