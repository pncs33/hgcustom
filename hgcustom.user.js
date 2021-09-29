// ==UserScript==
// @name         hgcustom
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       yamatohagi
// @match        https://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @updateURL    https://github.com/yamatohagi/TampermonkeyScript/raw/main/test.user.js
// @downloadURL  https://github.com/yamatohagi/TampermonkeyScript/raw/main/test.user.js
// ==/UserScript==
let SbuttonUrl = location.href
console.log(SbuttonUrl);
if (SbuttonUrl.match(/^(?=.*admin)(?=.*parties)(?=.*search)/)) {
    $('.text-left:eq(0)').append($('<input type="button" id="id001102" value="Sボタン" style="width:80px;height:27px;font-size:13px;background:#FF6633;" >').click(function () {
        var NameAndjoinnum = []
        for (var pidi = 0; pidi < document.getElementsByClassName('col-sm-7 text-left').length; pidi++) {
            var testPspan = document.getElementsByClassName('col-sm-7 text-left')[pidi].getElementsByTagName('span')[1].textContent
            var cusidinp1 = document.getElementsByClassName('party_id')[pidi].textContent
            var cusidinp2 = document.getElementsByClassName('party_floor span-separate-sentences')[pidi].textContent
            var cusidinp3 = document.getElementsByClassName('party_start_at')[pidi].textContent
            var cusparty_id = document.getElementsByClassName('party_id')[pidi].textContent

            var kikakunum = document.getElementsByClassName('table table-sm table-bordered')[pidi].textContent.match(/\d+(?=対)/)
            var joinman = document.getElementsByClassName('capacity_man')[pidi].previousElementSibling.textContent
            var joinwoman = document.getElementsByClassName('capacity_woman')[pidi].previousElementSibling.textContent
            var womanAge = document.getElementsByClassName('table table-sm table-bordered')[pidi].textContent.match(/(?<=年齢・条件\（女性\）\d+[~〜～])\d+(?=歳)/)
            var womanJsPass = document.querySelector(`#edit_party_${cusparty_id} > table > tbody > tr:nth-child(10) > td:nth-child(2) > div`).innerHTML.match(/(.*?)(?=<br>)/)[0]
            womanAge = womanAge || womanJsPass;

            NameAndjoinnum.push(`${cusidinp1} ${testPspan} ${cusidinp2} ${cusidinp3} ${joinman}-${joinwoman}(${kikakunum}-${kikakunum}) ${womanAge}`);
        }
        console.log(NameAndjoinnum.join('\n'));
        navigator.clipboard.writeText(NameAndjoinnum.join('\n'));
    }))
}
if (SbuttonUrl.match(/^(?=.*detail)(?=.*smartdevice_parties)/)) {//結果エクスポート
    $('.text-left:eq(0)').append($('<input type="button" id="id1153" value="エクスポート" style="width:90px;height:27px;font-size:13px;background:#F08080;" >').click(function () {
        function manExport() {
            var woman = document.querySelector("body > div > div:nth-child(6) > div > table > tbody").getElementsByTagName('tr').length - 1
            //女性の人数把握
            var manjoin = document.querySelector("body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(1)").getElementsByTagName('th').length - 1
            //男性の人数把握
            var dict = [];
            for (var man = 2; man < manjoin + 2; man++) {
                var ary = [];
                for (var manNumvertical = 2; manNumvertical < woman + 2; manNumvertical++) {
                    var goodnum = document.querySelector(`body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(${manNumvertical}) > td:nth-child(${man})`).getElementsByClassName('col-sm-6')[1].textContent
                    goodnum = goodnum || '0'
                    ary.push(goodnum)
                }
                ////

                var intMax = 0; //配列の最大値が0の場合もあるため、配列の要素の1番目で初期化すること

                for (var i = 0; i < ary.length; i++) {　// 要素0番目のは代入済みのため1番目から開始する

                    //intMaxに代入されている値と配列の要素を比較して、配列の要素のほうが大きい場合値を上書きする.
                    if (intMax < ary[i]) {
                        intMax = ary[i]
                    }
                }
                var numranking = []
                for (var inum = 1; inum <= intMax; inum++) {
                    var kari = ary.indexOf(`${inum}`)
                    numranking.push(kari + 1)
                }
                ///
                 dict.push(numranking);
            }
             console.log(dict)
            console.log(dict.join('\n'))
        }
        function womanExport() {
            var woman = document.querySelector("body > div > div:nth-child(6) > div > table > tbody").getElementsByTagName('tr').length - 1
            //女性の人数把握
            var man = document.querySelector("body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(1)").getElementsByTagName('th').length - 1
            //男性の人数把握
            var dict = [];
            for (var womanNum = 2; womanNum < woman + 2; womanNum++) {
                var lineElement = document.querySelector(`body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(${womanNum})`)
                var ary = [];
                for (var womanNumvertical = 2; womanNumvertical < man + 2; womanNumvertical++) {
                    var goodnum = lineElement.querySelector(`td:nth-child(${womanNumvertical})`).getElementsByClassName('col-sm-6')[0].textContent
                    goodnum = goodnum || '0'
                    ary.push(goodnum)
                }
                var intMax = 0; //配列の最大値が0の場合もあるため、配列の要素の1番目で初期化すること

                for (var i = 0; i < ary.length; i++) {　// 要素0番目のは代入済みのため1番目から開始する
                    //intMaxに代入されている値と配列の要素を比較して、配列の要素のほうが大きい場合値を上書きする.
                    if (intMax < ary[i]) {
                        intMax = ary[i]
                    }
                }
                var numranking = []
                for (var iwoman = 1; iwoman <= intMax; iwoman++) {
                    var kari = ary.indexOf(`${iwoman}`)
                    numranking.push(kari + 1)
                }
                ///
                dict.push(numranking);
            }
            console.log(dict)
            console.log(dict.join('\n'))
        }
        manExport()
        womanExport()
    }))
}