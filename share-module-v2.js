/**
 * MBTI古韵人格 - 一键分享模块
 * 集成方法：
 * 1. 将此文件保存为 share-module.js，放在与 index.html 同目录
 * 2. 在 index.html 的 </body> 前添加：<script src="share-module.js"></script>
 * 3. 在 showResult() 函数中调用 ShareModule.init(result)
 */

const ShareModule = (function() {
    // 古风配色（与你的网站保持一致）
    const colors = {
        bg: '#F5F0E8',
        card: '#FFFFFF',
        ink: '#2D2D2D',
        inkLight: '#6B6B6B',
        inkMuted: '#9B9B9B',
        accent: '#C45C4A',
        accentSoft: '#E8D5D2',
        gold: '#B8A07A'
    };
    
    let currentResult = null;
    let canvas = null;
    let ctx = null;
    let characterImg = null;  // 预加载的人物 SVG Image
    
    /**
     * 初始化分享模块
     * @param {Object} result - 测试结果对象
     * @param {string} result.type - MBTI类型（如 'INFJ'）
     * @param {string} result.name - 类型名称（如 '提倡者'）
     * @param {string} result.desc - 类型描述
     * @param {Array} result.traits - 特点标签数组
     */
    function init(result) {
        currentResult = result;
        createCanvas();
        preloadCharacter();
        drawResultImage();
        addShareButton();
    }
    
    // 预加载人物 SVG 为 Image
    function preloadCharacter() {
        if (typeof CharacterArt === 'undefined') {
            console.warn('CharacterArt 未加载');
            return;
        }
        const svg = CharacterArt.getSVG(currentResult.type);
        const blob = new Blob([svg], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        characterImg = new Image();
        characterImg.onload = () => {
            // 重新绘制以使用加载好的图片
            drawResultImage();
        };
        characterImg.src = url;
    }
    
    // 创建Canvas用于生成图片
    function createCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1440;
        ctx = canvas.getContext('2d');
        canvas.style.display = 'none';
        document.body.appendChild(canvas);
    }
    
    // 绘制结果图片（小红书3:4比例，1080x1440）
    function drawResultImage() {
        const w = 1080, h = 1440;
        
        // 背景渐变
        const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, colors.bg);
        bgGrad.addColorStop(0.5, '#FAF7F2');
        bgGrad.addColorStop(1, colors.accentSoft);
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);
        
        // 装饰边框
        ctx.strokeStyle = colors.accentSoft;
        ctx.lineWidth = 4;
        ctx.strokeRect(60, 60, 960, 1320);
        
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3;
        ctx.strokeRect(80, 80, 920, 1280);
        ctx.globalAlpha = 1;
        
        // 印章效果（背景装饰）
        drawStamp(ctx, 920, 200);
        
        // === 顶部标题区 ===
        ctx.font = 'bold 88px "Noto Serif SC", serif';
        ctx.fillStyle = colors.ink;
        ctx.textAlign = 'center';
        ctx.fillText('识 己', 540, 250);
        
        ctx.font = '30px "Noto Serif SC", serif';
        ctx.fillStyle = colors.inkLight;
        ctx.fillText('MBTI 古韵人格探索', 540, 305);
        
        // 分割线
        const dividerGrad = ctx.createLinearGradient(390, 345, 690, 345);
        dividerGrad.addColorStop(0, 'transparent');
        dividerGrad.addColorStop(0.5, colors.accent);
        dividerGrad.addColorStop(1, 'transparent');
        ctx.strokeStyle = dividerGrad;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(390, 345);
        ctx.lineTo(690, 345);
        ctx.stroke();
        
        // === 中部：左侧文字 + 右侧人物漫画 ===
        // 右侧人物 SVG（已预加载为 characterImg）
        if (characterImg && characterImg.complete && characterImg.naturalWidth > 0) {
            // 人物画在右侧区域 660-1020, 中心 (840, 540)
            const imgW = 360, imgH = 540;
            const imgX = 840 - imgW/2, imgY = 540 - imgH/2 + 20;
            ctx.drawImage(characterImg, imgX, imgY, imgW, imgH);
        } else {
            // 降级：使用 Canvas 绘制火柴人
            drawCharacterFallback(ctx, 860, 560, currentResult.type);
        }
        
        // 左侧 MBTI 大字
        ctx.font = 'bold 110px "Noto Serif SC", serif';
        ctx.fillStyle = colors.ink;
        ctx.textAlign = 'center';
        ctx.fillText(currentResult.type, 320, 490);
        
        // 类型古名
        ctx.font = '42px "Noto Serif SC", serif';
        ctx.fillStyle = colors.accent;
        ctx.fillText(currentResult.name, 320, 545);
        
        // 短装饰线
        ctx.strokeStyle = colors.accent;
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(260, 568);
        ctx.lineTo(380, 568);
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // === 描述（智能换行）===
        ctx.font = '24px "Noto Serif SC", serif';
        ctx.fillStyle = colors.inkLight;
        const descLines = wrapText(ctx, currentResult.desc || '', 460);
        const lineHeight = 36;
        const descStartY = 615;
        descLines.forEach((line, i) => {
            ctx.fillText(line, 320, descStartY + i * lineHeight);
        });
        
        // === 特点标签（居中一行）===
        if (currentResult.traits && currentResult.traits.length > 0) {
            const badgeY = 850;
            const totalBadges = currentResult.traits.length;
            const badgeW = 180;
            const badgeH = 50;
            const gap = 16;
            const totalW = totalBadges * badgeW + (totalBadges - 1) * gap;
            const startX = (w - totalW) / 2 + badgeW / 2;
            
            currentResult.traits.forEach((trait, i) => {
                const x = startX + i * (badgeW + gap);
                drawBadge(ctx, x, badgeY, trait, badgeW, badgeH);
            });
        }
        
        // === 底部古诗区 ===
        ctx.strokeStyle = colors.gold;
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(200, 1000);
        ctx.lineTo(880, 1000);
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // 诗
        if (currentResult.poem) {
            ctx.font = 'italic 32px "Noto Serif SC", serif';
            ctx.fillStyle = colors.ink;
            ctx.textAlign = 'center';
            ctx.fillText(currentResult.poem, 540, 1070);
        }
        
        // 诗人
        if (currentResult.figure) {
            ctx.font = '24px "Noto Serif SC", serif';
            ctx.fillStyle = colors.accent;
            ctx.textAlign = 'right';
            ctx.fillText('—— ' + currentResult.figure, 800, 1115);
        }
        
        // === 底部引导 ===
        ctx.font = '28px "Noto Serif SC", serif';
        ctx.fillStyle = colors.inkMuted;
        ctx.textAlign = 'center';
        ctx.fillText('以诗为镜 · 照见本心', 540, 1230);
        
        // 底部按钮
        drawBadge(ctx, 540, 1310, '点击测试  →', 280, 60);
    }
    
    // === 智能文本换行（中文标点优先）===
    function wrapText(ctx, text, maxWidth) {
        if (!text) return [];
        const breakChars = '，。、；：？！（）…— 　,.;:?!() ';
        const chars = Array.from(text);
        const lines = [];
        let current = '';
        
        for (let i = 0; i < chars.length; i++) {
            current += chars[i];
            const w = ctx.measureText(current).width;
            if (w > maxWidth && current.length > 1) {
                let breakPos = -1;
                for (let j = current.length - 1; j >= 0; j--) {
                    if (breakChars.includes(current[j])) {
                        breakPos = j;
                        break;
                    }
                }
                if (breakPos > 0) {
                    lines.push(current.substring(0, breakPos + 1).trim());
                    current = current.substring(breakPos + 1).trim();
                } else {
                    lines.push(current.substring(0, current.length - 1).trim());
                    current = current.substring(current.length - 1).trim();
                }
            }
        }
        if (current) lines.push(current.trim());
        return lines;
    }
    
    // === 降级方案：纯 Canvas 绘制火柴人（SVG 未加载时使用）===
    function drawCharacterFallback(ctx, cx, cy, type) {
        const palette = {
            'INTJ': { robe: '#3A4858', accent: '#C45C4A', symbol: '棋盘' },
            'INTP': { robe: '#5A6B7A', accent: '#7A8B9A', symbol: '书卷' },
            'ENTJ': { robe: '#7A2E2E', accent: '#D4A04A', symbol: '剑' },
            'ENTP': { robe: '#B8862E', accent: '#C45C4A', symbol: '扇' },
            'INFJ': { robe: '#6B5B7A', accent: '#D4A0A0', symbol: '莲' },
            'INFP': { robe: '#8A7AA8', accent: '#E8D5D2', symbol: '花' },
            'ENFJ': { robe: '#A87850', accent: '#D4A0A0', symbol: '灯' },
            'ENFP': { robe: '#D4845A', accent: '#E8B860', symbol: '风' },
            'ISTJ': { robe: '#4A5A4A', accent: '#B8A07A', symbol: '印' },
            'ISFJ': { robe: '#8A7A6A', accent: '#D4B8A0', symbol: '炉' },
            'ESTJ': { robe: '#6B4A3A', accent: '#D4A04A', symbol: '鼎' },
            'ESFJ': { robe: '#A87878', accent: '#E8B8A0', symbol: '琴' },
            'ISTP': { robe: '#5A5A6A', accent: '#B0B0B0', symbol: '刀' },
            'ISFP': { robe: '#9A8AA8', accent: '#D4B0C8', symbol: '花' },
            'ESTP': { robe: '#8A3A3A', accent: '#E8A040', symbol: '马' },
            'ESFP': { robe: '#C87060', accent: '#E8C060', symbol: '风' }
        };
        const p = palette[type] || palette['INTJ'];
        
        // 背景晕染圆
        const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 150);
        bgGrad.addColorStop(0, p.accent + '50');
        bgGrad.addColorStop(0.7, p.accent + '15');
        bgGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = bgGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, 150, 0, Math.PI * 2);
        ctx.fill();
        
        // 外圈装饰
        ctx.strokeStyle = p.accent;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 140, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
        
        // === 人物剪影 ===
        // 头（圆）
        ctx.fillStyle = '#F5E6D3';
        ctx.beginPath();
        ctx.arc(cx, cy - 55, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = p.robe;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // 发髻/帽子（半圆）
        ctx.fillStyle = p.robe;
        ctx.beginPath();
        ctx.arc(cx, cy - 70, 24, Math.PI, 2 * Math.PI);
        ctx.fill();
        // 发簪
        ctx.strokeStyle = p.accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx + 16, cy - 80);
        ctx.lineTo(cx + 28, cy - 80);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx + 28, cy - 80, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.accent;
        ctx.fill();
        
        // 衣身（梯形）
        ctx.fillStyle = p.robe;
        ctx.beginPath();
        ctx.moveTo(cx - 42, cy - 25);
        ctx.lineTo(cx + 42, cy - 25);
        ctx.lineTo(cx + 62, cy + 90);
        ctx.lineTo(cx - 62, cy + 90);
        ctx.closePath();
        ctx.fill();
        
        // V 领
        ctx.strokeStyle = p.accent;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx - 18, cy - 25);
        ctx.lineTo(cx, cy + 5);
        ctx.lineTo(cx + 18, cy - 25);
        ctx.stroke();
        
        // 腰带
        ctx.fillStyle = p.accent;
        ctx.fillRect(cx - 50, cy + 30, 100, 8);
        // 玉佩
        ctx.beginPath();
        ctx.arc(cx, cy + 50, 6, 0, Math.PI * 2);
        ctx.fill();
        // 玉佩流苏
        ctx.strokeStyle = p.accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy + 56);
        ctx.lineTo(cx, cy + 65);
        ctx.stroke();
        
        // 性格符号（衣摆下方）
        ctx.save();
        ctx.translate(cx, cy + 105);
        drawSymbol(ctx, p.symbol, p.accent);
        ctx.restore();
        
        // 类型小印（右上角）
        ctx.save();
        ctx.translate(cx + 95, cy - 95);
        ctx.rotate(-10 * Math.PI / 180);
        ctx.strokeStyle = p.accent;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.75;
        ctx.strokeRect(-22, -22, 44, 44);
        ctx.fillStyle = p.accent;
        ctx.globalAlpha = 0.85;
        ctx.font = 'bold 18px "Noto Serif SC", serif';
        ctx.textAlign = 'center';
        ctx.fillText(type.substring(2, 4), 0, 6);
        ctx.restore();
    }
    
    // 性格符号（简化古风图）
    function drawSymbol(ctx, symbol, color) {
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        switch(symbol) {
            case '棋盘':
                ctx.strokeRect(-20, -10, 40, 20);
                ctx.beginPath();
                ctx.moveTo(0, -10); ctx.lineTo(0, 10);
                ctx.moveTo(-20, 0); ctx.lineTo(20, 0);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(-10, 0, 4, 0, Math.PI * 2);
                ctx.fill();
                break;
            case '书卷':
                ctx.beginPath();
                ctx.moveTo(-22, -5);
                ctx.quadraticCurveTo(-22, -12, -15, -12);
                ctx.lineTo(15, -12);
                ctx.quadraticCurveTo(22, -12, 22, -5);
                ctx.lineTo(22, 8);
                ctx.quadraticCurveTo(22, 14, 15, 14);
                ctx.lineTo(-15, 14);
                ctx.quadraticCurveTo(-22, 14, -22, 8);
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, -12); ctx.lineTo(0, 14);
                ctx.stroke();
                break;
            case '剑':
                ctx.beginPath();
                ctx.moveTo(0, -18); ctx.lineTo(0, 6);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-10, 6); ctx.lineTo(10, 6);
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 12, 4, 0, Math.PI * 2);
                ctx.fill();
                break;
            case '扇':
                ctx.beginPath();
                ctx.arc(0, 5, 20, Math.PI, 2 * Math.PI);
                ctx.stroke();
                for(let i = 0; i < 5; i++) {
                    const a = Math.PI + (i+1) * Math.PI / 6;
                    ctx.beginPath();
                    ctx.moveTo(0, 5);
                    ctx.lineTo(Math.cos(a) * 20, 5 + Math.sin(a) * 20);
                    ctx.stroke();
                }
                break;
            case '莲':
                ctx.beginPath();
                ctx.arc(0, 0, 10, 0, Math.PI * 2);
                ctx.stroke();
                for(let i = 0; i < 6; i++) {
                    const a = i * Math.PI / 3;
                    ctx.beginPath();
                    ctx.ellipse(Math.cos(a)*7, Math.sin(a)*7, 6, 3.5, a, 0, Math.PI*2);
                    ctx.stroke();
                }
                break;
            case '花':
                for(let i = 0; i < 5; i++) {
                    const a = i * 2 * Math.PI / 5 - Math.PI/2;
                    ctx.beginPath();
                    ctx.arc(Math.cos(a)*10, Math.sin(a)*10, 6, 0, Math.PI*2);
                    ctx.stroke();
                }
                ctx.beginPath();
                ctx.arc(0, 0, 4, 0, Math.PI*2);
                ctx.fill();
                break;
            case '灯':
                ctx.beginPath();
                ctx.ellipse(0, 0, 12, 15, 0, 0, Math.PI*2);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-15, -5); ctx.lineTo(15, -5);
                ctx.moveTo(-15, 5); ctx.lineTo(15, 5);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, -15); ctx.lineTo(0, -22);
                ctx.moveTo(0, 15); ctx.lineTo(0, 22);
                ctx.stroke();
                break;
            case '风':
                ctx.beginPath();
                ctx.moveTo(-20, -5);
                ctx.quadraticCurveTo(-10, -10, 0, -5);
                ctx.quadraticCurveTo(10, 0, 20, -5);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-15, 5);
                ctx.quadraticCurveTo(-5, 0, 5, 5);
                ctx.quadraticCurveTo(15, 10, 20, 5);
                ctx.stroke();
                break;
            case '印':
                ctx.strokeRect(-15, -12, 30, 24);
                ctx.font = 'bold 16px serif';
                ctx.textAlign = 'center';
                ctx.fillText('印', 0, 5);
                break;
            case '炉':
                ctx.beginPath();
                ctx.moveTo(-15, -5);
                ctx.lineTo(-12, 10);
                ctx.lineTo(12, 10);
                ctx.lineTo(15, -5);
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-18, -5); ctx.lineTo(18, -5);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-5, -5); ctx.lineTo(-5, -15);
                ctx.moveTo(5, -5); ctx.lineTo(5, -15);
                ctx.stroke();
                break;
            case '鼎':
                ctx.beginPath();
                ctx.moveTo(-18, -10);
                ctx.lineTo(-15, 8);
                ctx.lineTo(15, 8);
                ctx.lineTo(18, -10);
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-20, -10); ctx.lineTo(20, -10);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-12, 8); ctx.lineTo(-15, 18);
                ctx.moveTo(0, 8); ctx.lineTo(0, 18);
                ctx.moveTo(12, 8); ctx.lineTo(15, 18);
                ctx.stroke();
                break;
            case '琴':
                ctx.strokeRect(-22, -3, 44, 6);
                ctx.beginPath();
                ctx.moveTo(-18, -3); ctx.lineTo(-18, -10);
                ctx.moveTo(-10, -3); ctx.lineTo(-10, -10);
                ctx.moveTo(-2, -3); ctx.lineTo(-2, -10);
                ctx.moveTo(6, -3); ctx.lineTo(6, -10);
                ctx.moveTo(14, -3); ctx.lineTo(14, -10);
                ctx.stroke();
                break;
            case '刀':
                ctx.beginPath();
                ctx.moveTo(-15, -10);
                ctx.quadraticCurveTo(0, -16, 16, 0);
                ctx.lineTo(5, 5);
                ctx.closePath();
                ctx.stroke();
                ctx.strokeRect(5, 5, 8, 3);
                break;
            case '马':
                ctx.beginPath();
                ctx.moveTo(-18, 5);
                ctx.quadraticCurveTo(-18, -8, -8, -10);
                ctx.lineTo(8, -10);
                ctx.quadraticCurveTo(18, -10, 18, 5);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-12, 5); ctx.lineTo(-12, 12);
                ctx.moveTo(-4, 5); ctx.lineTo(-4, 12);
                ctx.moveTo(4, 5); ctx.lineTo(4, 12);
                ctx.moveTo(12, 5); ctx.lineTo(12, 12);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(-8, -10); ctx.lineTo(-12, -16);
                ctx.moveTo(-2, -10); ctx.lineTo(-6, -16);
                ctx.stroke();
                break;
            default:
                ctx.beginPath();
                ctx.arc(0, 0, 8, 0, Math.PI*2);
                ctx.stroke();
        }
        ctx.restore();
    }
    
        // 绘制标签
    function drawBadge(ctx, x, y, text, w = 220, h = 50) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = colors.accentSoft;
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 2;
        roundRect(ctx, -w/2, -h/2, w, h, 25);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = colors.ink;
        ctx.font = '28px "Noto Serif SC", serif';
        ctx.textAlign = 'center';
        ctx.fillText(text, 0, 8);
        ctx.restore();
    }
    
    // 绘制印章
    function drawStamp(ctx, x, y) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-15 * Math.PI / 180);
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 4;
        ctx.globalAlpha = 0.6;
        ctx.strokeRect(-50, -50, 100, 100);
        ctx.fillStyle = colors.accent;
        ctx.globalAlpha = 0.7;
        ctx.font = '32px "Noto Serif SC", serif';
        ctx.textAlign = 'center';
        ctx.fillText('古韵', 0, 12);
        ctx.restore();
    }
    
    // 圆角矩形
    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }
    
    // 添加分享按钮到结果页面
    function addShareButton() {
        // 等待结果容器加载完成
        const checkExist = setInterval(() => {
            const resultContainer = document.querySelector('.result-card') || 
                                  document.querySelector('.card') ||
                                  document.querySelector('[class*="result"]');
            
            if (resultContainer) {
                clearInterval(checkExist);
                
                // 创建分享按钮
                const shareBtn = document.createElement('button');
                shareBtn.innerHTML = '🌸 分享我的结果';
                shareBtn.className = 'share-btn';
                shareBtn.onclick = showShareModal;
                
                // 应用样式（与你的网站风格一致）
                shareBtn.style.cssText = `
                    display: block;
                    width: 100%;
                    margin-top: 20px;
                    padding: 16px;
                    background: ${colors.ink};
                    color: ${colors.card};
                    border: none;
                    border-radius: 12px;
                    font-family: 'Noto Serif SC', serif;
                    font-size: 15px;
                    letter-spacing: 6px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                
                // 悬停效果
                shareBtn.onmouseover = () => {
                    shareBtn.style.background = colors.accent;
                    shareBtn.style.transform = 'translateY(-2px)';
                };
                shareBtn.onmouseout = () => {
                    shareBtn.style.background = colors.ink;
                    shareBtn.style.transform = 'translateY(0)';
                };
                
                // 插入到结果容器后面
                resultContainer.parentNode.insertBefore(shareBtn, resultContainer.nextSibling);
            }
        }, 500);
    }
    
    // 显示分享弹窗
    function showShareModal() {
        // 创建弹窗HTML
        const modalHTML = `
            <div id="share-modal" style="
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.6);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            ">
                <div style="
                    background: ${colors.card};
                    border-radius: 20px;
                    padding: 40px 28px;
                    max-width: 480px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
                ">
                    <h2 style="
                        color: ${colors.ink};
                        font-size: 24px;
                        text-align: center;
                        margin-bottom: 8px;
                        font-family: 'Noto Serif SC', serif;
                        letter-spacing: 4px;
                    ">🌸 分享你的结果</h2>
                    <p style="
                        color: ${colors.inkLight};
                        font-size: 14px;
                        text-align: center;
                        margin-bottom: 24px;
                        font-family: 'Noto Serif SC', serif;
                        letter-spacing: 2px;
                    ">让更多人遇见真实的自己</p>
                    
                    <!-- 结果预览 -->
                    <div id="result-preview" style="
                        background: linear-gradient(135deg, ${colors.bg} 0%, #FAF7F2 50%, ${colors.accentSoft} 100%);
                        border: 3px solid ${colors.accentSoft};
                        border-radius: 12px;
                        padding: 20px 24px;
                        margin-bottom: 24px;
                        display: flex;
                        align-items: center;
                        gap: 20px;
                    ">
                        <!-- 左侧文字 -->
                        <div style="flex: 1; min-width: 0; text-align: left;">
                            <div style="font-size: 40px; color: ${colors.ink}; font-weight: 700; margin-bottom: 4px; font-family: 'Noto Serif SC', serif; line-height: 1.1;">${currentResult.type}</div>
                            <div style="font-size: 18px; color: ${colors.accent}; margin-bottom: 12px; font-family: 'Noto Serif SC', serif;">${currentResult.name}</div>
                            <div style="font-size: 12px; color: ${colors.inkLight}; line-height: 1.7; font-family: 'Noto Serif SC', serif; max-height: 96px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical;">${currentResult.desc || ''}</div>
                        </div>
                        <!-- 右侧人物 SVG -->
                        <div id="preview-character" style="flex-shrink: 0; width: 130px; height: 170px; display: flex; align-items: center; justify-content: center;"></div>
                    </div>
                    
                    <!-- 分享按钮网格 -->
                    <div style="
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 12px;
                        margin-bottom: 20px;
                    ">
                        <button onclick="ShareModule.shareToXiaohongshu()" style="
                            background: linear-gradient(135deg, #ff2442, #e61e4d);
                            color: white;
                            border: none;
                            padding: 14px;
                            border-radius: 12px;
                            font-size: 14px;
                            cursor: pointer;
                            font-family: 'Noto Serif SC', serif;
                            letter-spacing: 2px;
                        ">📖 小红书</button>
                        
                        <button onclick="ShareModule.shareToWechat()" style="
                            background: linear-gradient(135deg, #07c160, #06ad56);
                            color: white;
                            border: none;
                            padding: 14px;
                            border-radius: 12px;
                            font-size: 14px;
                            cursor: pointer;
                            font-family: 'Noto Serif SC', serif;
                            letter-spacing: 2px;
                        ">💬 朋友圈</button>
                        
                        <button onclick="ShareModule.shareToWeibo()" style="
                            background: linear-gradient(135deg, #ff6633, #e55b2e);
                            color: white;
                            border: none;
                            padding: 14px;
                            border-radius: 12px;
                            font-size: 14px;
                            cursor: pointer;
                            font-family: 'Noto Serif SC', serif;
                            letter-spacing: 2px;
                        ">🔴 微博</button>
                        
                        <button onclick="ShareModule.shareToQQ()" style="
                            background: linear-gradient(135deg, #12b7f5, #0fa8e0);
                            color: white;
                            border: none;
                            padding: 14px;
                            border-radius: 12px;
                            font-size: 14px;
                            cursor: pointer;
                            font-family: 'Noto Serif SC', serif;
                            letter-spacing: 2px;
                        ">🐧 QQ</button>
                        
                        <button onclick="ShareModule.copyShareText()" style="
                            background: linear-gradient(135deg, ${colors.inkLight}, ${colors.inkMuted});
                            color: white;
                            border: none;
                            padding: 14px;
                            border-radius: 12px;
                            font-size: 14px;
                            cursor: pointer;
                            font-family: 'Noto Serif SC', serif;
                            letter-spacing: 2px;
                        ">📋 复制文案</button>
                        
                        <button onclick="ShareModule.downloadResultImage()" style="
                            background: linear-gradient(135deg, ${colors.ink}, ${colors.accent});
                            color: white;
                            border: none;
                            padding: 14px;
                            border-radius: 12px;
                            font-size: 14px;
                            cursor: pointer;
                            font-family: 'Noto Serif SC', serif;
                            letter-spacing: 2px;
                        ">📥 保存图片</button>
                    </div>
                    
                    <!-- 分享文案 -->
                    <div style="margin-top: 20px;">
                        <label style="
                            display: block;
                            color: ${colors.inkMuted};
                            margin-bottom: 8px;
                            font-size: 13px;
                            font-family: 'Noto Serif SC', serif;
                            letter-spacing: 1px;
                        ">分享文案（可编辑）：</label>
                        <textarea id="share-text" style="
                            width: 100%;
                            padding: 12px;
                            border: 2px solid ${colors.accentSoft};
                            border-radius: 8px;
                            font-family: 'Noto Serif SC', serif;
                            font-size: 13px;
                            resize: vertical;
                            min-height: 100px;
                            line-height: 1.6;
                            color: ${colors.ink};
                        "></textarea>
                    </div>
                    
                    <!-- 关闭按钮 -->
                    <button onclick="ShareModule.closeShareModal()" style="
                        display: block;
                        margin: 20px auto 0;
                        background: ${colors.accentSoft};
                        color: ${colors.ink};
                        border: none;
                        padding: 12px 40px;
                        border-radius: 12px;
                        font-size: 14px;
                        cursor: pointer;
                        font-family: 'Noto Serif SC', serif;
                        letter-spacing: 4px;
                    ">关闭</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        // 注入人物 SVG 到预览
        if (typeof CharacterArt !== 'undefined') {
            const previewEl = document.getElementById('preview-character');
            if (previewEl) {
                previewEl.innerHTML = CharacterArt.getSVG(currentResult.type);
            }
        }
        generateShareText();
    }
    
    // 关闭分享弹窗
    function closeShareModal() {
        const modal = document.getElementById('share-modal');
        if (modal) {
            modal.remove();
        }
    }
    
    // 生成分享文案
    function generateShareText() {
        const text = `🌸 刚做完古风MBTI测试，结果太准了！\n\n` +
                     `我的类型是：${currentResult.type}（${currentResult.name}）\n` +
                     `特点：${currentResult.traits ? currentResult.traits.join('、') : ''}\n\n` +
                     `以诗为镜，照见本心\n` +
                     `93道题，一场与自己的对话\n\n` +
                     `🔗 快来测测你的古韵人格：\n` +
                     `https://nc0319.github.io/mbti-test/\n\n` +
                     `#MBTI #古韵人格 #自我探索 #${currentResult.type}`;
        
        const textarea = document.getElementById('share-text');
        if (textarea) {
            textarea.value = text;
        }
    }
    
    // 分享到小红书
    function shareToXiaohongshu() {
        showToast('请保存图片后，手动发布到小红书 📖');
        setTimeout(() => {
            downloadResultImage();
        }, 1500);
    }
    
    // 分享到朋友圈
    function shareToWechat() {
        showToast('请保存图片后，手动发布到朋友圈 💬');
        setTimeout(() => {
            downloadResultImage();
        }, 1500);
    }
    
    // 分享到微博
    function shareToWeibo() {
        const text = document.getElementById('share-text').value;
        const url = 'https://service.weibo.com/share/share.php?title=' + 
                    encodeURIComponent(text) + 
                    '&url=' + encodeURIComponent('https://nc0319.github.io/mbti-test/');
        window.open(url, '_blank', 'width=600,height=400');
    }
    
    // 分享到QQ
    function shareToQQ() {
        const text = document.getElementById('share-text').value;
        const url = 'https://connect.qq.com/widget/shareqq/index.html?title=' + 
                    encodeURIComponent(text) + 
                    '&url=' + encodeURIComponent('https://nc0319.github.io/mbti-test/');
        window.open(url, '_blank', 'width=600,height=400');
    }
    
    // 复制分享文案
    function copyShareText() {
        const text = document.getElementById('share-text').value;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showToast('✅ 文案已复制到剪贴板');
            }).catch(() => {
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }
    
    // 降级复制方案
    function fallbackCopy(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast('✅ 文案已复制');
        } catch (err) {
            showToast('❌ 复制失败，请手动复制');
        }
        document.body.removeChild(textarea);
    }
    
    // 下载结果图片
    function downloadResultImage() {
        const link = document.createElement('a');
        link.download = `MBTI-${currentResult.type}-古韵人格.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        showToast('📥 图片已保存');
    }
    
    // 显示提示
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(45, 45, 45, 0.95);
            color: white;
            padding: 16px 32px;
            border-radius: 12px;
            font-size: 15px;
            z-index: 100000;
            font-family: 'Noto Serif SC', serif;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 2500);
    }
    
    // 公开API
    return {
        init: init,
        showShareModal: showShareModal,
        closeShareModal: closeShareModal,
        shareToXiaohongshu: shareToXiaohongshu,
        shareToWechat: shareToWechat,
        shareToWeibo: shareToWeibo,
        shareToQQ: shareToQQ,
        copyShareText: copyShareText,
        downloadResultImage: downloadResultImage
    };
})();

// ===== 集成说明 =====
// 1. 将此文件保存为 share-module.js
// 2. 在 index.html 中引入：<script src="share-module.js"></script>
// 3. 在 showResult() 函数中添加：
//    ShareModule.init({
//        type: 'INFJ',
//        name: '提倡者',
//        desc: '内向、直觉、情感、判断',
//        traits: ['理想主义', '有深度', '神秘', '有原则']
//    });
