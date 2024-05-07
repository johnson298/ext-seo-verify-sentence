const ELEMENT = {
    ROOT: '#ext-root',
    POPUP: '#popup-check-words'
}

function createRootElement(callback) {
    setTimeout(() => {
        const $newEl = document.createElement("div");
        $newEl.id = "ext-root";
        document.body.insertBefore($newEl, document.body.childNodes[0]);
        setTimeout(() => {
            callback()
        }, 10)
    }, 100)
}

function injectScriptNew(url, node) {
    const th = document.getElementsByTagName(node)[0];
    const s = document.createElement("script");
    s.setAttribute("type", "text/javascript");
    const injectUrl = chrome.runtime.getURL(url)
    s.setAttribute("src", injectUrl);
    th.appendChild(s);
}

function appendTemplate() {
    const $rootElement = $(ELEMENT.ROOT);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            $rootElement.append(xhr.responseText)
        }
    }
    const contentTemplateUrl = chrome.runtime.getURL('injects/content-template.html');
    xhr.open('GET', contentTemplateUrl, true)
    xhr.setRequestHeader("Content-type", "text/html")
    xhr.send()
}

function splitSentences(content) {
    //let content = `<p>Lãi suất tại Mỹ tăng cao khiến chính phủ nước này tốn nhiều tiền hơn để trả lãi cho những người mua trái phiếu kho bạc</p><p>Việc Mỹ nâng lãi suất 2 năm qua để ghìm lạm phát giúp nhà đầu tư trái phiếu kiếm bộn tiền. Ngược lại, chính phủ phải chi nhiều tiền hơn để trả lãi cho khối nợ công lên tới 34.000 tỷ USD.</p><p>Thống kê của&nbsp;<em>Bloomberg</em>&nbsp;cho thấy trong tháng 3</p><p>khi chính phủ chưa có dấu hiệu giảm chi và Cục Dự trữ liên bang Mỹ (<a href="https://vnexpress.net/chu-de/fed-6150" rel="dofollow" data-itm-source="#vn_source=Detail-KinhDoanh_QuocTe-4743177&amp;vn_campaign=Box-InternalLink&amp;vn_medium=Link-Fed&amp;vn_term=Desktop&amp;vn_thumb=0" data-itm-added="1" data-mce-href="https://vnexpress.net/chu-de/fed-6150">Fed</a>) chần chừ hạ lãi suất.</p><p>nhiều lắm em ơi....</p><p><br></p>`;

    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    let textContent = tempDiv.textContent || tempDiv.innerText || "";

    return textContent.split(/\.|\n/).filter(e => !!e)
}

function observeElement(callback) {

    // const targetNode = document.getElementById("wp-content-wrap")
    const targetNode = $("#content_ifr").contents().find("#tinymce")[0]
    // console.log('targetNode', targetNode)
    const callbackFn = (mutationList, observer) => {
        for (const mutation of mutationList) {
            console.log('mutation: ', mutation)
            callback()
            if (mutation.type === "childList") {
                console.log("A child node has been added or removed.");
            } else if (mutation.type === "attributes") {
                console.log(`The ${mutation.attributeName} attribute was modified.`);
            }
        }
    };
    const config = {attributes: true, childList: true, subtree: true, characterData: true};
    const observer = new MutationObserver(callbackFn);
    observer.observe(targetNode, config);
}

function generateSentencesDOM(sentencesMatched) {
    console.log('sentencesMatched', sentencesMatched)
    const $s = sentencesMatched.reduce((total, item, index) => {

        const $sentence = item.reduce((s, w) => {
            const count = w?.count || 0
            const isMatched = count > 0

            const tagClass = isMatched ? 'tw-bg-success-400 tw-text-neutral-0' : ''
            s += `<div class="ext-word ${tagClass}"><strong>${w?.word}</strong> <span>${count}</span></div>`
            return s
        }, '')

        total += `<div class="sentence-item tw-p-2 tw-flex tw-items-center tw-gap-1 tw-flex-wrap tw-border tw-mb-2 tw-border-neutral-200 tw-rounded-md"><strong>Câu ${index + 1}:</strong> ${$sentence}</div>`
        return total
    }, '')

    return `<div class="tw-p-4 list-sentence">${$s}</div>`
}

function getMatchedSentences(_sentences, _contents) {
    const sentenceList = Object.values(_sentences).map(e => e.words)
    const sentencesClone = JSON.parse(JSON.stringify(sentenceList))
    _contents.forEach(content => {
        sentencesClone.forEach(sentence => {
            sentence.forEach(item => {
                const {word} = item
                item.count = item.count || 0
                const matches = content.match(new RegExp(word, 'g'));
                item.count += matches ? matches.length : 0
            })
        })
    })
    return sentencesClone
}

function handleChangeContent() {
    const textContent = $("#content_ifr").contents().find("#tinymce").text()

    const sentencesSplited = splitSentences(textContent)

    const sentencesMatched = getMatchedSentences(dummyData, sentencesSplited)

    const $popupElement = $(ELEMENT.POPUP);

    const $sentences = generateSentencesDOM(sentencesMatched)
    $popupElement.html($sentences)
}

$(document).ready(function () {
    createRootElement(function () {
        // injectScriptNew('lib/tailwindcss-3.4.3.js', 'body')
        // injectScriptNew('injects/tailwind.config.js', 'body')
        appendTemplate()
        console.log('tailwind222', tailwind)

        setTimeout(() => {
            handleChangeContent()

            observeElement(function() {
                handleChangeContent()
            })


        }, 1000)


    })

})