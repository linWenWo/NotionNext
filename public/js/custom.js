// 这里编写自定义js脚本；将被静态引入到页面中
// JSONP 请求函数
function jsonp(url, params) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');

        // 生成一个唯一的 callback 函数名
        const callback = `jsonp_callback_${Date.now()}`;

        // 将 callback 函数添加到 window 对象
        window[callback] = function (data) {
            // 清理
            document.body.removeChild(script);
            delete window[callback];
            resolve(data); // 返回数据
        };

        // 将参数序列化为查询字符串
        const queryString = new URLSearchParams(params).toString();
        script.src = `${url}?${queryString}&callback=${callback}`;

        // 处理错误
        script.onerror = function () {
            reject(new Error('JSONP request failed'));
            delete window[callback];
        };

        // 将 script 标签插入到页面中
        document.body.appendChild(script);
    });
}

// 发送请求函数
function sendRequest() {
    const messageInput = document.getElementById('messageInput').value; // 获取用户输入的消息
    const url = 'https://study.memobird.cn/ashx/DBInterface.ashx'; // 目标 API 地址

    const params = {
        DataType: 'printTable',
        msg: messageInput, // 将用户输入的消息作为参数
        toUserName: '自然醒',
        fromUserId: 5864469,
        fromUserName: '自然醒',
        showNick: 1,
        guid: 'b17ce175145a43588be00e28f42e0e4b',
        source: 1,
        headUrl: 'https://xgserver.blob.core.chinacloudapi.cn/ggstudy/userimg_aff852241d5a4434a7a4058664d54ebe35354716b8e2479a9255d5ecd16d42dc.jpg'
    };

    jsonp(url, params)
        .then(data => {
            console.log('成功获取数据:', data);
            alert('请求成功，查看控制台获取数据'); // 提示用户请求成功
        })
        .catch(error => {
            console.error('请求失败:', error);
            alert('请求失败，请查看控制台');
        });
}

// 页面加载后执行的函数
window.onload = function () {
    const checkElement = document.querySelector("#article-header-cover > div > div.leading-snug.font-bold.xs\\:text-4xl.sm\\:text-4xl.md\\:text-5xl.md\\:leading-snug.text-4xl.shadow-text-md.flex.justify-center.text-center.text-white");
    const targetElement = document.querySelector("#notion-article > main > div.notion-text.notion-block-136626e0d7c280028907e2cc28178418");
    console.log("开始了")
    // 检查checkElement的文本内容是否为 "咕咕机打印哦"
    if (checkElement && checkElement.textContent.trim() === "咕咕机打印哦" && targetElement) {
        // 创建输入框和按钮
        const inputContainer = document.createElement('div');
        const messageInput = document.createElement('input');
        const sendButton = document.createElement('button');

        // 设置输入框属性
        messageInput.id = 'messageInput';
        messageInput.placeholder = '请输入消息内容';
        inputContainer.appendChild(messageInput);

        // 设置按钮属性和点击事件
        sendButton.innerText = '发送';
        sendButton.onclick = sendRequest;
        inputContainer.appendChild(sendButton);

        // 将输入框和按钮添加到目标元素中
        targetElement.appendChild(inputContainer);
    }
};
