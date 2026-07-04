/**
 * MBTI古韵人格 - 16型古风人物 SVG 插画
 * 每个 MBTI 类型对应一个历史/诗词人物
 * 风格：水墨剪影 + 古风配色 + 标志性手持物
 */

const CharacterArt = (function() {
    // 16型人物配置
    const characters = {
        'INTJ': {
            name: '诸葛亮', title: '智略之眸',
            palette: { skin: '#F5E6D3', robe: '#2C3E50', accent: '#C45C4A', hair: '#1A1A1A' },
            hat: 'lun巾',  // 纶巾
            prop: '羽扇',
            expression: '睿智'
        },
        'INTP': {
            name: '庄子', title: '逍遥之士',
            palette: { skin: '#F5E6D3', robe: '#5A6B7A', accent: '#7A8B9A', hair: '#2C2C2C' },
            hat: '散发',
            prop: '书卷',
            expression: '沉思'
        },
        'ENTJ': {
            name: '岳飞', title: '将帅之魂',
            palette: { skin: '#F5E6D3', robe: '#5C2C2C', accent: '#D4A04A', hair: '#1A1A1A' },
            hat: '战盔',
            prop: '长枪',
            expression: '威严'
        },
        'ENTP': {
            name: '惠能', title: '禅心妙舌',
            palette: { skin: '#F5E6D3', robe: '#8B6B3A', accent: '#C45C4A', hair: '#1A1A1A' },
            hat: '光头',
            prop: '拂尘',
            expression: '机锋'
        },
        'INFJ': {
            name: '屈原', title: '离骚之魂',
            palette: { skin: '#F5E6D3', robe: '#5A4A6B', accent: '#A87AA8', hair: '#1A1A1A' },
            hat: '高冠',
            prop: '兰草',
            expression: '忧郁'
        },
        'INFP': {
            name: '李商隐', title: '诗心朦胧',
            palette: { skin: '#F5E6D3', robe: '#6A5A8A', accent: '#D4A0C8', hair: '#1A1A1A' },
            hat: '软帽',
            prop: '诗卷',
            expression: '惆怅'
        },
        'ENFJ': {
            name: '孔子', title: '至圣之仁',
            palette: { skin: '#F5E6D3', robe: '#8B5A3A', accent: '#D4A0A0', hair: '#1A1A1A' },
            hat: '儒巾',
            prop: '竹简',
            expression: '温和'
        },
        'ENFP': {
            name: '李白', title: '诗仙醉月',
            palette: { skin: '#F5E6D3', robe: '#A8604A', accent: '#E8B860', hair: '#1A1A1A' },
            hat: '散发',
            prop: '酒壶',
            expression: '豪放'
        },
        'ISTJ': {
            name: '司马迁', title: '史笔如椽',
            palette: { skin: '#F5E6D3', robe: '#4A5A4A', accent: '#B8A07A', hair: '#1A1A1A' },
            hat: '进贤冠',
            prop: '毛笔',
            expression: '严谨'
        },
        'ISFJ': {
            name: '孟母', title: '慈训之德',
            palette: { skin: '#F5E6D3', robe: '#8A5A6A', accent: '#D4B0A0', hair: '#1A1A1A' },
            hat: '发髻',
            prop: '织梭',
            expression: '慈祥'
        },
        'ESTJ': {
            name: '班固', title: '汉纪之柱',
            palette: { skin: '#F5E6D3', robe: '#5A3A2A', accent: '#D4A04A', hair: '#1A1A1A' },
            hat: '乌纱',
            prop: '印绶',
            expression: '刚正'
        },
        'ESFJ': {
            name: '长孙皇后', title: '温婉之仪',
            palette: { skin: '#F5E6D3', robe: '#A8505A', accent: '#E8B0A0', hair: '#1A1A1A' },
            hat: '凤钗',
            prop: '玉如意',
            expression: '端庄'
        },
        'ISTP': {
            name: '鲁智深', title: '禅杖降魔',
            palette: { skin: '#D4A878', robe: '#4A3A2A', accent: '#A8884A', hair: '#1A1A1A' },
            hat: '光头',
            prop: '禅杖',
            expression: '豪迈'
        },
        'ISFP': {
            name: '王维', title: '诗佛画心',
            palette: { skin: '#F5E6D3', robe: '#7A6A8A', accent: '#B0A0C8', hair: '#1A1A1A' },
            hat: '软帽',
            prop: '古琴',
            expression: '淡然'
        },
        'ESTP': {
            name: '霍去病', title: '少年战神',
            palette: { skin: '#F5E6D3', robe: '#7A2A2A', accent: '#E8A040', hair: '#1A1A1A' },
            hat: '战盔',
            prop: '长弓',
            expression: '英武'
        },
        'ESFP': {
            name: '杨贵妃', title: '回眸倾城',
            palette: { skin: '#FAE6D3', robe: '#C8506A', accent: '#E8C060', hair: '#1A1A1A' },
            hat: '发髻',
            prop: '牡丹',
            expression: '雍容'
        }
    };
    
    /**
     * 生成 SVG 字符串
     */
    function getCharacterSVG(type) {
        const c = characters[type] || characters['INTJ'];
        const p = c.palette;
        
        return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 320" width="240" height="320">
            <defs>
                <radialGradient id="bg-${type}" cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stop-color="${p.accent}" stop-opacity="0.3"/>
                    <stop offset="70%" stop-color="${p.accent}" stop-opacity="0.08"/>
                    <stop offset="100%" stop-color="${p.accent}" stop-opacity="0"/>
                </radialGradient>
                <linearGradient id="robe-${type}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="${p.robe}"/>
                    <stop offset="100%" stop-color="${p.robe}" stop-opacity="0.85"/>
                </linearGradient>
            </defs>
            
            <!-- 背景晕染 -->
            <circle cx="120" cy="120" r="110" fill="url(#bg-${type})"/>
            
            <!-- 衣身（袍子+袖子） -->
            <path d="M 60 175 L 70 140 Q 80 125 100 122 L 140 122 Q 160 125 170 140 L 180 175 L 200 290 Q 200 300 190 300 L 50 300 Q 40 300 40 290 Z"
                  fill="url(#robe-${type})" stroke="${p.robe}" stroke-width="1.5"/>
            
            <!-- 内衬（领口） -->
            <path d="M 95 122 L 120 145 L 145 122 L 140 130 L 120 155 L 100 130 Z" fill="${p.accent}" opacity="0.9"/>
            
            <!-- 腰带 -->
            <rect x="55" y="215" width="130" height="12" fill="${p.accent}"/>
            <rect x="55" y="215" width="130" height="3" fill="#1A1A1A" opacity="0.2"/>
            
            <!-- 玉佩 -->
            <circle cx="120" cy="240" r="6" fill="${p.accent}"/>
            <line x1="120" y1="246" x2="120" y2="265" stroke="${p.accent}" stroke-width="1.5"/>
            <line x1="115" y1="265" x2="125" y2="265" stroke="${p.accent}" stroke-width="2"/>
            
            <!-- 袖子（双手位置） -->
            <ellipse cx="55" cy="225" rx="22" ry="35" fill="${p.robe}" transform="rotate(-15 55 225)"/>
            <ellipse cx="185" cy="225" rx="22" ry="35" fill="${p.robe}" transform="rotate(15 185 225)"/>
            
            <!-- 头 -->
            <ellipse cx="120" cy="90" rx="32" ry="38" fill="${p.skin}" stroke="${p.hair}" stroke-width="1.5"/>
            
            <!-- 头发/帽子 -->
            ${renderHeadwear(c.hat, type, p)}
            
            <!-- 五官 -->
            ${renderFace(c.expression, p)}
            
            <!-- 胡须（男士/有气质者） -->
            ${renderBeard(type, p)}
            
            <!-- 手持物 -->
            ${renderProp(c.prop, p)}
            
            <!-- 印章（人物名） -->
            <g transform="translate(190 280) rotate(-8)">
                <rect x="-22" y="-22" width="44" height="44" fill="none" stroke="${p.accent}" stroke-width="2.5" opacity="0.85"/>
                <text x="0" y="-3" font-family="serif" font-size="11" fill="${p.accent}" text-anchor="middle" font-weight="bold" opacity="0.9">${c.name}</text>
                <text x="0" y="13" font-family="serif" font-size="8" fill="${p.accent}" text-anchor="middle" opacity="0.7">之像</text>
            </g>
            
            <!-- 底部装饰线 -->
            <line x1="40" y1="310" x2="200" y2="310" stroke="${p.accent}" stroke-width="1" opacity="0.3"/>
        </svg>`;
    }
    
    // 头饰/帽子
    function renderHeadwear(hat, type, p) {
        const hair = p.hair;
        switch(hat) {
            case 'lun巾': // 诸葛亮纶巾
                return `
                    <path d="M 85 75 Q 88 50 120 48 Q 152 50 155 75 L 155 80 L 85 80 Z" fill="${hair}"/>
                    <path d="M 88 72 Q 95 55 120 52 Q 145 55 152 72" fill="none" stroke="${p.accent}" stroke-width="1.5"/>
                    <rect x="100" y="78" width="40" height="3" fill="${p.accent}"/>`;
            case '散发': // 李白式散发
                return `
                    <path d="M 88 80 Q 85 50 120 48 Q 155 50 152 80 L 155 100 Q 145 95 130 92 L 110 92 Q 95 95 85 100 Z" fill="${hair}"/>
                    <path d="M 88 80 Q 70 90 65 130 Q 75 110 90 100" fill="${hair}"/>
                    <path d="M 152 80 Q 170 90 175 130 Q 165 110 150 100" fill="${hair}"/>`;
            case '战盔': // 战盔
                return `
                    <path d="M 85 78 Q 88 50 120 48 Q 152 50 155 78 L 158 90 L 82 90 Z" fill="${p.accent}"/>
                    <path d="M 85 75 Q 88 55 120 52 Q 152 55 155 75" fill="none" stroke="#1A1A1A" stroke-width="1"/>
                    <circle cx="120" cy="50" r="4" fill="${p.accent}" stroke="#1A1A1A" stroke-width="1"/>
                    <path d="M 113 50 L 127 50 L 122 30 L 118 30 Z" fill="${p.accent}"/>
                    <path d="M 90 85 L 80 95 M 150 85 L 160 95" stroke="${p.accent}" stroke-width="2"/>`;
            case '光头': // 和尚/惠能/鲁智深
                return `
                    <ellipse cx="120" cy="90" rx="32" ry="38" fill="#D4A878"/>
                    <circle cx="105" cy="100" r="2.5" fill="#1A1A1A"/>
                    <circle cx="135" cy="100" r="2.5" fill="#1A1A1A"/>
                    <path d="M 105 100 Q 120 102 135 100" fill="none" stroke="${p.hair}" stroke-width="1" opacity="0.3"/>
                    <circle cx="120" cy="50" r="8" fill="${p.accent}" opacity="0.5"/>`;
            case '高冠': // 屈原
                return `
                    <path d="M 85 80 L 88 55 Q 92 35 100 30 L 140 30 Q 148 35 152 55 L 155 80 Z" fill="${p.accent}"/>
                    <line x1="100" y1="30" x2="100" y2="20" stroke="${p.accent}" stroke-width="2"/>
                    <line x1="140" y1="30" x2="140" y2="20" stroke="${p.accent}" stroke-width="2"/>
                    <line x1="105" y1="20" x2="135" y2="20" stroke="${p.accent}" stroke-width="1.5"/>
                    <circle cx="100" cy="18" r="2" fill="${p.accent}"/>
                    <circle cx="140" cy="18" r="2" fill="${p.accent}"/>
                    <path d="M 88 60 L 152 60" stroke="#1A1A1A" stroke-width="1"/>`;
            case '软帽': // 唐宋文人
                return `
                    <path d="M 88 78 Q 92 55 120 50 Q 148 55 152 78 L 150 82 L 90 82 Z" fill="${p.hair}"/>
                    <path d="M 95 70 Q 105 60 120 58 Q 135 60 145 70" fill="none" stroke="${p.accent}" stroke-width="1.5"/>`;
            case '儒巾': // 孔子
                return `
                    <path d="M 88 80 Q 90 50 120 48 Q 150 50 152 80 Z" fill="${p.hair}"/>
                    <rect x="90" y="60" width="60" height="14" fill="${p.accent}"/>
                    <line x1="100" y1="60" x2="100" y2="48" stroke="${p.accent}" stroke-width="2"/>
                    <line x1="140" y1="60" x2="140" y2="48" stroke="${p.accent}" stroke-width="2"/>`;
            case '进贤冠': // 司马迁
                return `
                    <rect x="88" y="60" width="64" height="22" fill="${p.accent}"/>
                    <line x1="92" y1="60" x2="92" y2="48" stroke="${p.accent}" stroke-width="2"/>
                    <line x1="108" y1="60" x2="108" y2="40" stroke="${p.accent}" stroke-width="2"/>
                    <line x1="132" y1="60" x2="132" y2="40" stroke="${p.accent}" stroke-width="2"/>
                    <line x1="148" y1="60" x2="148" y2="48" stroke="${p.accent}" stroke-width="2"/>
                    <circle cx="108" cy="38" r="2" fill="${p.accent}"/>
                    <circle cx="132" cy="38" r="2" fill="${p.accent}"/>`;
            case '发髻': // 孟母/杨贵妃
                return `
                    <ellipse cx="120" cy="50" rx="20" ry="15" fill="${p.hair}"/>
                    <ellipse cx="105" cy="62" rx="10" ry="8" fill="${p.hair}"/>
                    <ellipse cx="135" cy="62" rx="10" ry="8" fill="${p.hair}"/>
                    <path d="M 88 78 Q 95 70 120 70 Q 145 70 152 78" fill="${p.hair}"/>
                    <circle cx="105" cy="62" r="2" fill="${p.accent}"/>
                    <circle cx="135" cy="62" r="2" fill="${p.accent}"/>`;
            case '乌纱': // 班固
                return `
                    <path d="M 88 78 Q 88 55 120 50 Q 152 55 152 78 L 155 82 L 85 82 Z" fill="${p.hair}"/>
                    <rect x="80" y="78" width="80" height="5" fill="${p.hair}"/>
                    <line x1="100" y1="50" x2="100" y2="40" stroke="${p.accent}" stroke-width="2"/>
                    <line x1="140" y1="50" x2="140" y2="40" stroke="${p.accent}" stroke-width="2"/>
                    <line x1="105" y1="40" x2="135" y2="40" stroke="${p.accent}" stroke-width="1.5"/>`;
            case '凤钗': // 长孙皇后/杨贵妃
                return `
                    <ellipse cx="120" cy="55" rx="22" ry="18" fill="${p.hair}"/>
                    <path d="M 105 55 Q 100 50 95 48 Q 100 52 102 58" fill="${p.hair}"/>
                    <path d="M 135 55 Q 140 50 145 48 Q 140 52 138 58" fill="${p.hair}"/>
                    <line x1="108" y1="45" x2="108" y2="35" stroke="${p.accent}" stroke-width="1.5"/>
                    <line x1="132" y1="45" x2="132" y2="35" stroke="${p.accent}" stroke-width="1.5"/>
                    <circle cx="108" cy="33" r="3" fill="${p.accent}"/>
                    <circle cx="132" cy="33" r="3" fill="${p.accent}"/>
                    <path d="M 90 70 Q 95 75 105 73 L 135 73 Q 145 75 150 70" fill="${p.hair}"/>`;
            default:
                return `<path d="M 88 78 Q 90 55 120 50 Q 150 55 152 78 Z" fill="${p.hair}"/>`;
        }
    }
    
    // 五官
    function renderFace(expression, p) {
        const eyeY = 95;
        const mouthY = 115;
        let mouth = '';
        switch(expression) {
            case '睿智': mouth = `<path d="M 113 115 Q 120 113 127 115" fill="none" stroke="${p.hair}" stroke-width="1.5"/>`; break;
            case '沉思': mouth = `<path d="M 113 116 Q 120 118 127 116" fill="none" stroke="${p.hair}" stroke-width="1.5"/>`; break;
            case '威严': mouth = `<path d="M 112 115 L 128 115" stroke="${p.hair}" stroke-width="2"/>`; break;
            case '机锋': mouth = `<path d="M 112 116 Q 120 120 128 114" fill="none" stroke="${p.hair}" stroke-width="1.5"/>`; break;
            case '忧郁': mouth = `<path d="M 113 118 Q 120 115 127 118" fill="none" stroke="${p.hair}" stroke-width="1.5"/>`; break;
            case '惆怅': mouth = `<path d="M 113 117 Q 120 119 127 117" fill="none" stroke="${p.hair}" stroke-width="1.5"/>`; break;
            case '温和': mouth = `<path d="M 113 115 Q 120 118 127 115" fill="none" stroke="${p.hair}" stroke-width="1.5"/>`; break;
            case '豪放': mouth = `<path d="M 110 113 Q 120 120 130 113" fill="none" stroke="${p.hair}" stroke-width="2"/>`; break;
            case '严谨': mouth = `<path d="M 113 115 L 127 115" stroke="${p.hair}" stroke-width="1.5"/>`; break;
            case '慈祥': mouth = `<path d="M 112 115 Q 120 119 128 115" fill="none" stroke="${p.hair}" stroke-width="1.5"/>`; break;
            case '刚正': mouth = `<path d="M 112 115 L 128 115" stroke="${p.hair}" stroke-width="2"/>`; break;
            case '端庄': mouth = `<path d="M 113 115 Q 120 117 127 115" fill="none" stroke="${p.hair}" stroke-width="1.2"/>`; break;
            case '豪迈': mouth = `<path d="M 108 113 Q 120 122 132 113" fill="none" stroke="${p.hair}" stroke-width="2"/>`; break;
            case '淡然': mouth = `<path d="M 113 116 Q 120 118 127 116" fill="none" stroke="${p.hair}" stroke-width="1"/>`; break;
            case '英武': mouth = `<path d="M 110 115 L 130 115" stroke="${p.hair}" stroke-width="2"/>`; break;
            case '雍容': mouth = `<path d="M 112 115 Q 120 119 128 115" fill="none" stroke="${p.hair}" stroke-width="1.2"/>`; break;
            default: mouth = `<path d="M 113 115 Q 120 117 127 115" fill="none" stroke="${p.hair}" stroke-width="1.5"/>`;
        }
        return `
            <path d="M 100 ${eyeY-3} Q 105 ${eyeY-5} 110 ${eyeY-3}" fill="none" stroke="${p.hair}" stroke-width="2" stroke-linecap="round"/>
            <path d="M 130 ${eyeY-3} Q 135 ${eyeY-5} 140 ${eyeY-3}" fill="none" stroke="${p.hair}" stroke-width="2" stroke-linecap="round"/>
            <circle cx="105" cy="${eyeY}" r="2" fill="${p.hair}"/>
            <circle cx="135" cy="${eyeY}" r="2" fill="${p.hair}"/>
            <path d="M 115 108 Q 120 110 125 108" fill="none" stroke="${p.hair}" stroke-width="1" opacity="0.5"/>
            ${mouth}`;
    }
    
    // 胡须
    function renderBeard(type, p) {
        const withBeard = ['INTJ', 'ENTJ', 'ISTJ', 'ESTJ', 'ISTP', 'ESTP', 'ISFP'];
        if (!withBeard.includes(type)) return '';
        return `<path d="M 108 122 Q 120 130 132 122 L 128 135 Q 120 140 112 135 Z" fill="${p.hair}" opacity="0.8"/>`;
    }
    
    // 手持物
    function renderProp(prop, p) {
        switch(prop) {
            case '羽扇': // 诸葛亮
                return `
                    <g transform="translate(50 195)">
                        <ellipse cx="0" cy="0" rx="20" ry="25" fill="#F5E6D3" stroke="${p.hair}" stroke-width="1.5"/>
                        <line x1="0" y1="0" x2="0" y2="-30" stroke="${p.hair}" stroke-width="2.5"/>
                        <line x1="0" y1="0" x2="-12" y2="-22" stroke="${p.hair}" stroke-width="1"/>
                        <line x1="0" y1="0" x2="12" y2="-22" stroke="${p.hair}" stroke-width="1"/>
                        <line x1="0" y1="0" x2="-18" y2="-15" stroke="${p.hair}" stroke-width="1"/>
                        <line x1="0" y1="0" x2="18" y2="-15" stroke="${p.hair}" stroke-width="1"/>
                        <ellipse cx="0" cy="0" rx="8" ry="12" fill="${p.accent}" opacity="0.3"/>
                    </g>`;
            case '书卷':
                return `
                    <g transform="translate(190 195)">
                        <rect x="-15" y="-20" width="30" height="40" fill="#F5E6D3" stroke="${p.hair}" stroke-width="1.5"/>
                        <line x1="-10" y1="-10" x2="10" y2="-10" stroke="${p.hair}" stroke-width="0.8"/>
                        <line x1="-10" y1="-3" x2="10" y2="-3" stroke="${p.hair}" stroke-width="0.8"/>
                        <line x1="-10" y1="4" x2="10" y2="4" stroke="${p.hair}" stroke-width="0.8"/>
                        <line x1="-10" y1="11" x2="10" y2="11" stroke="${p.hair}" stroke-width="0.8"/>
                    </g>`;
            case '长枪':
                return `
                    <g transform="translate(50 150)">
                        <rect x="-2" y="0" width="4" height="100" fill="#8B6B3A"/>
                        <polygon points="0,-30 -6,0 6,0" fill="${p.accent}" stroke="${p.hair}" stroke-width="1"/>
                        <circle cx="0" cy="5" r="3" fill="${p.accent}"/>
                    </g>`;
            case '拂尘':
                return `
                    <g transform="translate(50 180)">
                        <rect x="-2" y="0" width="4" height="70" fill="#8B6B3A"/>
                        <path d="M 0 0 Q -8 -10 -12 -25 M 0 0 Q 0 -12 0 -28 M 0 0 Q 8 -10 12 -25" fill="none" stroke="#F5E6D3" stroke-width="1.5"/>
                        <circle cx="0" cy="-28" r="2" fill="${p.accent}"/>
                    </g>`;
            case '兰草':
                return `
                    <g transform="translate(190 200)">
                        <path d="M 0 30 Q -5 10 -10 -5 M 0 30 Q 0 5 0 -15 M 0 30 Q 5 10 10 -5" stroke="${p.accent}" fill="none" stroke-width="1.5"/>
                        <ellipse cx="-10" cy="-5" rx="4" ry="8" fill="${p.accent}" transform="rotate(-30 -10 -5)"/>
                        <ellipse cx="0" cy="-15" rx="3" ry="6" fill="${p.accent}"/>
                        <ellipse cx="10" cy="-5" rx="4" ry="8" fill="${p.accent}" transform="rotate(30 10 -5)"/>
                    </g>`;
            case '诗卷':
                return `
                    <g transform="translate(50 200)">
                        <ellipse cx="0" cy="0" rx="18" ry="6" fill="#F5E6D3" stroke="${p.hair}" stroke-width="1.5"/>
                        <ellipse cx="-18" cy="0" rx="4" ry="6" fill="${p.accent}"/>
                        <ellipse cx="18" cy="0" rx="4" ry="6" fill="${p.accent}"/>
                        <line x1="-15" y1="0" x2="15" y2="0" stroke="${p.hair}" stroke-width="0.8"/>
                    </g>`;
            case '竹简':
                return `
                    <g transform="translate(50 195)">
                        <rect x="-15" y="-25" width="30" height="50" fill="#D4B080" stroke="${p.hair}" stroke-width="1.5"/>
                        <line x1="-12" y1="-18" x2="12" y2="-18" stroke="${p.hair}" stroke-width="0.5"/>
                        <line x1="-12" y1="-10" x2="12" y2="-10" stroke="${p.hair}" stroke-width="0.5"/>
                        <line x1="-12" y1="-2" x2="12" y2="-2" stroke="${p.hair}" stroke-width="0.5"/>
                        <line x1="-12" y1="6" x2="12" y2="6" stroke="${p.hair}" stroke-width="0.5"/>
                        <line x1="-12" y1="14" x2="12" y2="14" stroke="${p.hair}" stroke-width="0.5"/>
                        <rect x="-15" y="-25" width="30" height="3" fill="${p.accent}"/>
                        <rect x="-15" y="22" width="30" height="3" fill="${p.accent}"/>
                    </g>`;
            case '酒壶':
                return `
                    <g transform="translate(50 200)">
                        <ellipse cx="0" cy="0" rx="15" ry="18" fill="${p.accent}" stroke="${p.hair}" stroke-width="1.5"/>
                        <ellipse cx="0" cy="-12" rx="10" ry="3" fill="${p.hair}"/>
                        <path d="M 0 -18 Q 5 -25 -3 -28" fill="none" stroke="${p.hair}" stroke-width="1.5"/>
                        <line x1="-8" y1="3" x2="8" y2="3" stroke="${p.hair}" stroke-width="0.8" opacity="0.5"/>
                    </g>`;
            case '毛笔':
                return `
                    <g transform="translate(50 190)">
                        <rect x="-2" y="0" width="4" height="50" fill="#8B6B3A"/>
                        <path d="M -2 50 L 0 65 L 2 50 Z" fill="${p.hair}"/>
                        <rect x="-3" y="-5" width="6" height="8" fill="${p.accent}"/>
                    </g>`;
            case '织梭':
                return `
                    <g transform="translate(50 200)">
                        <path d="M -15 -5 L 15 5 L 15 15 L -15 5 Z" fill="${p.accent}" stroke="${p.hair}" stroke-width="1.5"/>
                        <line x1="-15" y1="-5" x2="-15" y2="5" stroke="${p.hair}" stroke-width="1"/>
                        <line x1="15" y1="5" x2="15" y2="15" stroke="${p.hair}" stroke-width="1"/>
                    </g>`;
            case '印绶':
                return `
                    <g transform="translate(50 200)">
                        <rect x="-12" y="-12" width="24" height="24" fill="${p.accent}" stroke="${p.hair}" stroke-width="1.5"/>
                        <text x="0" y="3" font-family="serif" font-size="10" fill="#FFF" text-anchor="middle" font-weight="bold">令</text>
                        <line x1="0" y1="12" x2="0" y2="40" stroke="${p.accent}" stroke-width="2"/>
                        <circle cx="0" cy="45" r="3" fill="${p.accent}"/>
                    </g>`;
            case '玉如意':
                return `
                    <g transform="translate(50 195)">
                        <path d="M 0 -20 Q -15 -15 -10 0 Q 0 10 10 0 Q 15 -15 0 -20" fill="${p.accent}" stroke="${p.hair}" stroke-width="1.5"/>
                        <line x1="0" y1="0" x2="0" y2="40" stroke="#8B6B3A" stroke-width="2"/>
                    </g>`;
            case '禅杖':
                return `
                    <g transform="translate(50 150)">
                        <rect x="-2" y="0" width="4" height="120" fill="#8B6B3A"/>
                        <circle cx="0" cy="0" r="6" fill="${p.accent}" stroke="${p.hair}" stroke-width="1"/>
                        <circle cx="0" cy="-5" r="4" fill="${p.accent}"/>
                        <circle cx="0" cy="5" r="4" fill="${p.accent}"/>
                    </g>`;
            case '古琴':
                return `
                    <g transform="translate(50 200) rotate(-15)">
                        <rect x="-20" y="-4" width="40" height="8" fill="#8B6B3A" stroke="${p.hair}" stroke-width="1.2"/>
                        <line x1="-15" y1="-4" x2="-15" y2="-10" stroke="#1A1A1A" stroke-width="0.8"/>
                        <line x1="-8" y1="-4" x2="-8" y2="-10" stroke="#1A1A1A" stroke-width="0.8"/>
                        <line x1="-1" y1="-4" x2="-1" y2="-10" stroke="#1A1A1A" stroke-width="0.8"/>
                        <line x1="6" y1="-4" x2="6" y2="-10" stroke="#1A1A1A" stroke-width="0.8"/>
                        <line x1="13" y1="-4" x2="13" y2="-10" stroke="#1A1A1A" stroke-width="0.8"/>
                    </g>`;
            case '长弓':
                return `
                    <g transform="translate(50 200)">
                        <path d="M -25 0 Q -30 -40 0 -50 Q 30 -40 25 0" fill="none" stroke="#8B6B3A" stroke-width="2.5"/>
                        <line x1="-25" y1="0" x2="25" y2="0" stroke="#F5E6D3" stroke-width="1"/>
                    </g>`;
            case '牡丹':
                return `
                    <g transform="translate(50 195)">
                        <circle cx="0" cy="0" r="12" fill="${p.accent}" opacity="0.7"/>
                        <circle cx="-7" cy="-7" r="6" fill="${p.accent}" opacity="0.85"/>
                        <circle cx="7" cy="-7" r="6" fill="${p.accent}" opacity="0.85"/>
                        <circle cx="-7" cy="7" r="6" fill="${p.accent}" opacity="0.85"/>
                        <circle cx="7" cy="7" r="6" fill="${p.accent}" opacity="0.85"/>
                        <circle cx="0" cy="0" r="4" fill="#E8C060"/>
                        <ellipse cx="-15" cy="10" rx="6" ry="3" fill="${p.accent}" opacity="0.6" transform="rotate(-30 -15 10)"/>
                        <ellipse cx="15" cy="10" rx="6" ry="3" fill="${p.accent}" opacity="0.6" transform="rotate(30 15 10)"/>
                    </g>`;
            default:
                return '';
        }
    }
    
    /**
     * 预加载所有 SVG 为 Image 对象（用于 Canvas 绘制）
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
