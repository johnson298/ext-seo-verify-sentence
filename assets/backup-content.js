// const ELEMENT = {
//     ROOT: '#ext-root',
//     POPUP: '#popup-check-words',
//     SENTENCE: '#sentence-item',
// }
//
// function createRootElement(callback) {
//     setTimeout(() => {
//         const $newEl = document.createElement("div");
//         $newEl.id = "ext-root";
//         document.body.insertBefore($newEl, document.body.childNodes[0]);
//         setTimeout(() => {
//             callback()
//         }, 10)
//     }, 100)
// }
//
// function injectScriptNew(url, node) {
//     const th = document.getElementsByTagName(node)[0];
//     const s = document.createElement("script");
//     s.setAttribute("type", "text/javascript");
//     const injectUrl = chrome.runtime.getURL(url)
//     s.setAttribute("src", injectUrl);
//     th.appendChild(s);
// }
//
// function appendTemplate() {
//     const $rootElement = $(ELEMENT.ROOT);
//
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             $rootElement.append(xhr.responseText)
//         }
//     }
//     const contentTemplateUrl = chrome.runtime.getURL('injects/content-template.html');
//     xhr.open('GET', contentTemplateUrl, true)
//     xhr.setRequestHeader("Content-type", "text/html")
//     xhr.send()
// }
//
// function splitSentences(content) {
//     let tempDiv = document.createElement("div");
//     tempDiv.innerHTML = content;
//
//     let textContent = tempDiv.textContent || tempDiv.innerText || "";
//
//     return textContent.split(/\.|\n/).filter(e => !!e)
// }
//
// function observeElement(callback) {
//
//     // const targetNode = document.getElementById("wp-content-wrap")
//     const targetNode = $("#content_ifr").contents().find("#tinymce")[0]
//     // console.log('targetNode', targetNode)
//     const callbackFn = (mutationList, observer) => {
//         for (const mutation of mutationList) {
//             console.log('mutation: ', mutation)
//             callback()
//             if (mutation.type === "childList") {
//                 console.log("A child node has been added or removed.");
//             } else if (mutation.type === "attributes") {
//                 console.log(`The ${mutation.attributeName} attribute was modified.`);
//             }
//         }
//     };
//     const config = {attributes: true, childList: true, subtree: true, characterData: true};
//     const observer = new MutationObserver(callbackFn);
//     observer.observe(targetNode, config);
// }
//
// function generateSentencesDOM(sentencesMatched) {
//     console.log('sentencesMatched', sentencesMatched)
//
//     const $s = sentencesMatched.reduce((total, item, index) => {
//         const isMatchedAll = item.every(item => item?.count > 0)
//         const classSentence = isMatchedAll ? 'tw-border-success-500' : 'tw-border-neutral-300'
//
//         const $sentence = item.reduce((s, w) => {
//             const count = w?.count || 0
//             const isMatched = count > 0
//
//             const tagClass = isMatched ? 'tw-border-success-400 tw-bg-success-200' : 'tw-opacity-80 tw-border-neutral-300'
//             s += `<div class="ext-word ${tagClass}"><strong>${w?.word}</strong> <span>${count}</span></div>`
//             return s
//         }, '')
//
//         total += `<div class="${classSentence} sentence-item tw-shadow-sm tw-p-2 tw-flex tw-items-center tw-gap-1 tw-flex-wrap tw-border tw-mb-2 tw-rounded-md"><strong>Câu ${index + 1}:</strong> ${$sentence}</div>`
//         return total
//     }, '')
//
//     return `<div class="list-sentence">${$s}</div>`
// }
//
// function getMatchedSentences(_sentences, _contents) {
//     const sentenceList = Object.values(_sentences).map(e => e.words)
//     const sentencesClone = JSON.parse(JSON.stringify(sentenceList))
//     _contents.forEach(content => {
//         sentencesClone.forEach(sentence => {
//             sentence.forEach(item => {
//                 const {word} = item
//                 item.count = item.count || 0
//                 const _content = content.toLowerCase().normalize()
//                 const _word = word.toLowerCase().normalize()
//                 const matches = _content.match(new RegExp(_word, 'g'));
//                 item.count += matches ? matches.length : 0
//             })
//         })
//     })
//     return sentencesClone
// }
//
// function handleChangeContent() {
//     const textContent = $("#content_ifr").contents().find("#tinymce").text()
//
//     const sentencesSplited = splitSentences(textContent)
//
//     const sentencesMatched = getMatchedSentences(dummyData, sentencesSplited)
//
//     const $popupElement = $(ELEMENT.SENTENCE);
//
//     const $sentences = generateSentencesDOM(sentencesMatched)
//     $popupElement.html($sentences)
// }

// $(document).ready(function () {
//     createRootElement(function () {
//         appendTemplate()
//
//         setTimeout(() => {
//             handleChangeContent()
//
//             observeElement(function () {
//                 handleChangeContent()
//             })
//
//         }, 1000)
//
//         $('body').on('click', '#expand-icon', function() {
//             $('#popup-check-words').toggleClass('active')
//         })
//         $('body').on('click', '#close-ext-popup', function() {
//             $('#popup-check-words').toggleClass('active')
//         })
//     })
//
// })