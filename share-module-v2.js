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
        drawResultImage();
        addShareButton();
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
    
    // 绘制结果图片（小红书3:4比例）
    function drawResultImage() {
        const w = 1080, h = 1440;
        
        // 背景渐变
        const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, colors.bg);
        bgGrad.addColorStop(0.5, '#FAF7F2');
        bgGrad.addColorStop(1, '#E8D5D2');
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
        
        // 标题
        ctx.font = 'bold 96px "Noto Serif SC", serif';
        ctx.fillStyle = colors.ink;
        ctx.textAlign = 'center';
        ctx.fillText('识己', 540, 300);
        
        // 副标题
        ctx.font = '36px "Noto Serif SC", serif';
        ctx.fillStyle = colors.inkLight;
        ctx.fillText('MBTI 古韵人格探索', 540, 380);
        
        // 分割线
        const dividerGrad = ctx.createLinearGradient(390, 430, 690, 430);
        dividerGrad.addColorStop(0, 'transparent');
        dividerGrad.addColorStop(0.5, colors.accent);
        dividerGrad.addColorStop(1, 'transparent');
        ctx.strokeStyle = dividerGrad;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(390, 430);
        ctx.lineTo(690, 430);
        ctx.stroke();
        
        // 结果类型
        ctx.font = 'bold 140px "Noto Serif SC", serif';
        ctx.fillStyle = colors.ink;
        ctx.fillText(currentResult.type, 540, 650);
        
        // 结果名称
        ctx.font = '48px "Noto Serif SC", serif';
        ctx.fillStyle = colors.accent;
        ctx.fillText(currentResult.name, 540, 750);
        
        // 结果描述
        ctx.font = '32px "Noto Serif SC", serif';
        ctx.fillStyle = colors.inkLight;
        ctx.fillText(currentResult.desc, 540, 850);
        
        // 特点标签
        if (currentResult.traits && currentResult.traits.length > 0) {
            ctx.font = '28px "Noto Serif SC", serif';
            let yPos = 950;
            currentResult.traits.forEach(trait => {
                drawBadge(ctx, 540, yPos, trait, 220, 50);
                yPos += 70;
            });
        }
        
        // 底部引导
        ctx.font = '36px "Noto Serif SC", serif';
        ctx.fillStyle = colors.inkMuted;
        ctx.fillText('以诗为镜，照见本心', 540, 1250);
        
        // 印章效果
        drawStamp(ctx, 900, 200);
        
        // 底部按钮
        drawBadge(ctx, 540, 1350, '点击测试 →', 280, 60);
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
                        padding: 24px;
                        margin-bottom: 24px;
                        text-align: center;
                    ">
                        <div style="font-size: 48px; color: ${colors.ink}; font-weight: 700; margin-bottom: 8px; font-family: 'Noto Serif SC', serif;">${currentResult.type}</div>
                        <div style="font-size: 20px; color: ${colors.accent}; margin-bottom: 16px; font-family: 'Noto Serif SC', serif;">${currentResult.name}</div>
                        <div style="font-size: 14px; color: ${colors.inkLight}; line-height: 1.8; font-family: 'Noto Serif SC', serif;">${currentResult.desc}</div>
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
