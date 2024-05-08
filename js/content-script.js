class ContentsJs {
    constructor() {
        this.ELEMENT = {
            ROOT: '#ext-root',
            POPUP: '#popup-check-words',
            SENTENCE: '#sentence-item',
            EDITOR_IFRAME: '#content_ifr',
            EDITOR: '#tinymce'
        }
        this.INJECTIONS = {
            CONTENT_TEMPLATE: 'injects/content-template.html',
        }
    }

    createRootElement(callback) {
        setTimeout(() => {
            const $newEl = document.createElement("div");
            $newEl.id = "ext-root";
            document.body.insertBefore($newEl, document.body.childNodes[0]);
            setTimeout(() => {
                callback()
            }, 10)
        }, 100)
    }

    injectScriptNew(url, node) {
        const th = document.getElementsByTagName(node)[0];
        const s = document.createElement("script");
        s.setAttribute("type", "text/javascript");
        const injectUrl = chrome.runtime.getURL(url)
        s.setAttribute("src", injectUrl);
        th.appendChild(s);
    }

    appendTemplate() {
        const $rootElement = $(this.ELEMENT.ROOT);

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                $rootElement.append(xhr.responseText)
            }
        }
        const contentTemplateUrl = chrome.runtime.getURL(this.INJECTIONS.CONTENT_TEMPLATE);
        xhr.open('GET', contentTemplateUrl, true)
        xhr.setRequestHeader("Content-type", "text/html")
        xhr.send()
    }

    splitSentences(content) {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;

        let textContent = tempDiv.textContent || tempDiv.innerText || "";

        return textContent.split(/\.|\n/).filter(e => !!e)
    }

    observeEditorElement(callback) {
        // const targetNode = document.getElementById("wp-content-wrap")
        const targetNode = $(this.ELEMENT.EDITOR_IFRAME).contents().find(this.ELEMENT.EDITOR)[0]
        const callbackFn = (mutationList, observer) => {
            for (const mutation of mutationList) {
                // console.log('mutation: ', mutation)
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

    generateSentencesDOM(sentencesMatched) {
        const $s = sentencesMatched.reduce((total, item, index) => {
            const isMatchedAll = item.every(item => item?.count > 0)
            const classSentence = isMatchedAll ? 'tw-border-success-500' : 'tw-border-neutral-300'

            const $sentence = item.reduce((s, w) => {
                const count = w?.count || 0
                const isMatched = count > 0

                const tagClass = isMatched ? 'tw-border-success-400 tw-bg-success-200' : 'tw-opacity-80 tw-border-neutral-300'
                s += `<div class="ext-word ${tagClass}"><strong>${w?.word}</strong> <span>${count}</span></div>`
                return s
            }, '')

            total += `<div class="${classSentence} sentence-item tw-shadow-sm tw-p-2 tw-flex tw-items-center tw-gap-1 tw-flex-wrap tw-border tw-mb-2 tw-rounded-md"><strong>Câu ${index + 1}:</strong> ${$sentence}</div>`
            return total
        }, '')

        return `<div class="list-sentence">${$s}</div>`
    }

    getMatchedSentences(_sentences, _contents) {
        const sentenceList = Object.values(_sentences).map(e => e.words)
        const sentencesClone = JSON.parse(JSON.stringify(sentenceList))
        _contents.forEach(content => {
            sentencesClone.forEach(sentence => {
                sentence.forEach(item => {
                    const {word} = item
                    item.count = item.count || 0
                    const _content = content.toLowerCase().normalize()
                    const _word = word.toLowerCase().normalize()
                    const matches = _content.match(new RegExp(_word, 'g'));
                    item.count += matches ? matches.length : 0
                })
            })
        })
        return sentencesClone
    }

    handleChangeContent() {
        const textContent = $("#content_ifr").contents().find("#tinymce").text()

        const sentencesSplited = this.splitSentences(textContent)

        const sentencesMatched = this.getMatchedSentences(dummyData, sentencesSplited)

        const $popupElement = $(this.ELEMENT.SENTENCE);

        const $sentences = this.generateSentencesDOM(sentencesMatched)
        $popupElement.html($sentences)
    }

}


$(document).ready(function () {
    let maximumRequest = 10
    function detectEditor(callbackFn) {
        const editor = $('#content_ifr').contents().find('#tinymce')[0]
        if(editor){
            callbackFn()
        } else {
            if(maximumRequest === 0) return
            setTimeout(() => {
                maximumRequest -= 1
                detectEditor(callbackFn)
            }, 800)
        }
    }

    detectEditor(function(){
        const contentJs = new ContentsJs()
        contentJs.createRootElement(function () {
            contentJs.appendTemplate()

            setTimeout(() => {
                contentJs.handleChangeContent()

                contentJs.observeEditorElement(function () {
                    contentJs.handleChangeContent()
                })

            }, 800)

        })
    })

    $('body').on('click', '#expand-icon', function () {
        $('#popup-check-words').toggleClass('active')
    })
    // close extension popup
    $('body').on('click', '#close-ext-popup', function () {
        $('#popup-check-words').toggleClass('active')
    })
})