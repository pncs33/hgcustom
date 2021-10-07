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
    $('.text-left:eq(0)').append($('<input type="button" id="id001102" value="Sボタン" style="width:80px;height:27px;font-size:13px;background:#FFC898;" >').click(function () {
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
    $('.text-left:eq(0)').append($('<input type="button" id="id29987" value="編集画面一括Open(重いので注意)" style="width:280px;height:27px;font-size:14px;background:#CDF2CA;" >').click(function () {
        for (var i = 3; i <= document.getElementsByClassName('btn btn-default btn-sm').length; i = i + 5) {
            var test = document.getElementsByClassName('btn btn-default btn-sm')[i].href
            window.open(test);
        }
    }))
    $('.text-left:eq(0)').append($('<input type="button" id="id29988" value="参加者一覧画面一括Open(重いので注意)" style="width:280px;height:27px;font-size:14px;background:#FFDEFA;" >').click(function () {
        for (var i = 1; i <= document.getElementsByClassName('btn btn-default btn-sm').length; i++) {
            if ((i % 5) == 0) {
                var test = document.getElementsByClassName('btn btn-default btn-sm')[i].href
                window.open(test);
            }
        }
    }))
}
if (SbuttonUrl.match(/^(?=.*detail)(?=.*smartdevice_parties)/)) {//結果エクスポート
    $('.text-left:eq(0)').append($('<input type="button" id="id1153" value="エクスポート" style="width:90px;height:27px;font-size:13px;background:#F08080;" >').click(function () {
        //女性の人数把握
        var joinedCountWoman = document.querySelector("body > div > div:nth-child(6) > div > table > tbody").getElementsByTagName('tr').length - 1
        //男性の人数把握
        var joinedCountMan = document.querySelector("body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(1)").getElementsByTagName('th').length - 1
        function manExport() {
            //最終的な格納配列（男）
            var goodVoteMan = [];
            for (var man = 2; man < joinedCountMan + 2; man++) {
                var ary = [];
                for (var manNumvertical = 2; manNumvertical < joinedCountWoman + 2; manNumvertical++) {
                    var goodnum = document.querySelector(`body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(${manNumvertical}) > td:nth-child(${man})`).getElementsByClassName('col-sm-6')[1].textContent
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
                for (var inum = 1; inum <= intMax; inum++) {
                    var kari = ary.indexOf(`${inum}`)
                    numranking.push(kari + 1)
                }
                goodVoteMan.push(numranking);
            }
            return (goodVoteMan)
        }
        function womanExport() {
            //最終的な格納配列（女）
            var goodVoteWoman = [];
            for (var womanNum = 2; womanNum < joinedCountWoman + 2; womanNum++) {
                var lineElement = document.querySelector(`body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(${womanNum})`)
                var ary = [];
                for (var womanNumvertical = 2; womanNumvertical < joinedCountMan + 2; womanNumvertical++) {
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
                goodVoteWoman.push(numranking);
            }
            return (goodVoteWoman)
            //console.log(goodVoteWoman.join('\n'))
        }
        var goodVoteMan = manExport()
        var goodVoteWoman = womanExport()
        var adjustmentJoinedCountMan = 0;
        var adjustmentJoinedCountWoman = 0;
        var doubletalkResult = [];
        function doubletalkArryinitialize(adjustmentJoinedCountWoman) {
            for (var i = 0; i < adjustmentJoinedCountWoman; i++) {

                var talkcount = [0, 0, 0];
                doubletalkResult.push(talkcount);

            }
        }
        if (joinedCountMan == joinedCountWoman) {
            adjustmentJoinedCountMan = joinedCountMan
            adjustmentJoinedCountWoman = joinedCountWoman
            doubletalkArryinitialize(adjustmentJoinedCountWoman)
        }
        if (joinedCountMan < joinedCountWoman) {
            adjustmentJoinedCountMan = joinedCountWoman
            adjustmentJoinedCountWoman = joinedCountWoman
            doubletalkArryinitialize(adjustmentJoinedCountWoman)

        } if (joinedCountWoman < joinedCountMan) {
            adjustmentJoinedCountMan = joinedCountMan
            adjustmentJoinedCountWoman = joinedCountMan
            doubletalkArryinitialize(adjustmentJoinedCountWoman)
        }
        function overlappingAndBlank(ver, ary, specifyMan, selectWoman, No1or2or3) {
            var included = false
            var Blankjudgment = false
            if (ary.includes(specifyMan) == false) {
                included = true
            }
            if (doubletalkResult[selectWoman][No1or2or3] == 0) {
                Blankjudgment = true
            }
            if (ver == 1) {
                if (doubletalkResult[selectWoman].includes(specifyMan) == true) {
                    Blankjudgment = false
                }
            }
            if (included && Blankjudgment) {
                return true
            } else {
                return false
            }
        }
        function overlappingAndBlank_manTo(ary, specifyMan, selectWoman, No1or2or3) {
            var included = false
            var Blankjudgment = false
            if (ary.includes(specifyMan) == false) {
                included = true
            }
            if (doubletalkResult[selectWoman][No1or2or3] == 0) {
                Blankjudgment = true
            }
            if (doubletalkResult[selectWoman].includes(specifyMan) == true) {
                Blankjudgment = false
            }
            if (included && Blankjudgment) {
                return true
            } else {
                return false
            }
        }
        //女性優先両想いver
        for (var No1to3man = 0; No1to3man < goodVoteWoman.length; No1to3man++) {
            for (var selectWoman = 0; selectWoman < goodVoteWoman.length; selectWoman++) {
                var WomanVote = goodVoteWoman[selectWoman]
                var specifyMan = WomanVote[No1to3man]
                // console.log(`第${No1to3man + 1}希望 ${selectWoman + 1} ${specifyMan} `)
                specifyMan = specifyMan || 0
                if (!specifyMan == 0) {
                    if (goodVoteMan[specifyMan - 1].includes(selectWoman + 1) == true) {
                        var ary = [];
                        var ary1 = [];
                        var ary2 = [];
                        for (var i0 = 0; i0 < adjustmentJoinedCountWoman; i0++) {
                            ary.push(doubletalkResult[i0][0])
                        }
                        for (var i1 = 0; i1 < adjustmentJoinedCountWoman; i1++) {
                            ary1.push(doubletalkResult[i1][1])
                        }
                        for (var i2 = 0; i2 < adjustmentJoinedCountWoman; i2++) {
                            ary2.push(doubletalkResult[i2][2])
                        }
                        var i0TorF = overlappingAndBlank(0, ary, specifyMan, selectWoman, 0)
                        //console.log(`ary ＊${ary}＊ i0TorF＊${i0TorF}＊ selectWoman＊${selectWoman}＊ specifyMan＊${specifyMan}＊ 見てる列＊0＊`)
                        if (i0TorF == true) {
                            doubletalkResult[selectWoman][0] = specifyMan
                        }
                        if (i0TorF == false) {
                            var i1TorF = overlappingAndBlank(0, ary1, specifyMan, selectWoman, 1)
                            //console.log(`ary＊${ary1}＊ i0TorF＊${i1TorF}＊ selectWoman＊${selectWoman}＊ specifyMan＊${specifyMan}＊ 見てる列＊1＊`)
                            if (i1TorF == true) {
                                doubletalkResult[selectWoman][1] = specifyMan
                            }
                            if (i1TorF == false) {
                                var i2TorF = overlappingAndBlank(0, ary2, specifyMan, selectWoman, 2)
                                if (i2TorF == true) {
                                    doubletalkResult[selectWoman][2] = specifyMan
                                }
                            }
                        }
                    }
                }
            }

        }
        //女性優先片思いver
        for (var No1to3man_womanTo = 0; No1to3man_womanTo < goodVoteWoman.length; No1to3man_womanTo++) {
            for (var selectWoman = 0; selectWoman < goodVoteWoman.length; selectWoman++) {
                var WomanVote = goodVoteWoman[selectWoman]


                var specifyMan = WomanVote[No1to3man_womanTo]
                // console.log(`第${No1to3man + 1}希望 ${selectWoman + 1} ${specifyMan} `)
                specifyMan = specifyMan || 0
                if (!specifyMan == 0) {
                    var ary = [];
                    var ary1 = [];
                    var ary2 = [];
                    for (var i0 = 0; i0 < adjustmentJoinedCountWoman; i0++) {
                        ary.push(doubletalkResult[i0][0])
                    }
                    for (var i1 = 0; i1 < adjustmentJoinedCountWoman; i1++) {
                        ary1.push(doubletalkResult[i1][1])
                    }
                    for (var i2 = 0; i2 < adjustmentJoinedCountWoman; i2++) {
                        ary2.push(doubletalkResult[i2][2])
                    }
                    var i0TorF = overlappingAndBlank(1, ary, specifyMan, selectWoman, 0)
                    //console.log(`ary ＊${ary}＊ i0TorF＊${i0TorF}＊ selectWoman＊${selectWoman}＊ specifyMan＊${specifyMan}＊ 見てる列＊0＊`)
                    if (i0TorF == true) {
                        doubletalkResult[selectWoman][0] = specifyMan
                    }
                    if (i0TorF == false) {
                        var i1TorF = overlappingAndBlank(1, ary1, specifyMan, selectWoman, 1)
                        //console.log(`ary＊${ary1}＊ i0TorF＊${i1TorF}＊ selectWoman＊${selectWoman}＊ specifyMan＊${specifyMan}＊ 見てる列＊1＊`)
                        if (i1TorF == true) {
                            doubletalkResult[selectWoman][1] = specifyMan
                        }
                        if (i1TorF == false) {
                            var i2TorF = overlappingAndBlank(1, ary2, specifyMan, selectWoman, 2)
                            if (i2TorF == true) {
                                doubletalkResult[selectWoman][2] = specifyMan
                            }
                        }
                    }

                }
            }

        }
        //男性片思いver
        for (var No1to3woman_manTo = 0; No1to3woman_manTo < goodVoteMan.length; No1to3woman_manTo++) {
            for (var selectMan = 0; selectMan < goodVoteMan.length; selectMan++) {
                var ManVote = goodVoteMan[selectMan]
                var specifyWoman = ManVote[No1to3woman_manTo]
                specifyWoman = specifyWoman || 0
                if (!specifyWoman == 0) {
                    var ary = [];
                    var ary1 = [];
                    var ary2 = [];
                    for (var i0 = 0; i0 < adjustmentJoinedCountWoman; i0++) {
                        ary.push(doubletalkResult[i0][0])
                    }
                    for (var i1 = 0; i1 < adjustmentJoinedCountWoman; i1++) {
                        ary1.push(doubletalkResult[i1][1])
                    }
                    for (var i2 = 0; i2 < adjustmentJoinedCountWoman; i2++) {
                        ary2.push(doubletalkResult[i2][2])
                    }
                    var i0TorF = overlappingAndBlank_manTo(ary, selectMan + 1, specifyWoman - 1, 0)
                    //console.log(`ary＊${ary}＊ i0TorF＊${i0TorF}＊ selectWoman＊${selectMan + 1}＊ specifyMan＊${specifyWoman - 1}＊ 見てる列＊0＊`)
                    if (i0TorF == true) {
                        doubletalkResult[specifyWoman - 1][0] = selectMan + 1
                    }
                    if (i0TorF == false) {
                        var i1TorF = overlappingAndBlank_manTo(ary1, selectMan + 1, specifyWoman - 1, 1)
                        //console.log(`ary＊${ary1}＊ i0TorF＊${i1TorF}＊ selectWoman＊${selectMan + 1}＊ specifyMan＊${specifyWoman - 1}＊ 見てる列＊1＊`)
                        if (i1TorF == true) {
                            doubletalkResult[specifyWoman - 1][1] = selectMan + 1
                        }
                        if (i1TorF == false) {
                            var i2TorF = overlappingAndBlank_manTo(ary2, selectMan + 1, specifyWoman - 1, 2)
                            if (i2TorF == true) {
                                doubletalkResult[specifyWoman - 1][2] = selectMan + 1
                            }
                        }
                    }


                }
            }

        } console.log(doubletalkResult)
        {
            var blankdoubletalkResult = doubletalkResult

            //空席埋める
            function overlappingAndBlank_Blank(ary, Blankman, selectWoman, No1or2or3) {
                var included = false
                var Blankjudgment = false
                if (ary.includes(Blankman) == false) {
                    included = true
                }
                if (blankdoubletalkResult[selectWoman][No1or2or3] == 0) {
                    Blankjudgment = true
                }
                if (blankdoubletalkResult[selectWoman].includes(Blankman) == true) {
                    Blankjudgment = false
                }
                if (included && Blankjudgment) {
                    return true
                } else {
                    return false
                }
            }

            for (var No1to3_Blank = 0; No1to3_Blank < 3; No1to3_Blank++) {
                for (var selectWoman = 0; selectWoman < blankdoubletalkResult.length; selectWoman++) {
                    if (blankdoubletalkResult[selectWoman][No1to3_Blank] == 0) {
                        var ary = [];

                        for (var i0 = 0; i0 < adjustmentJoinedCountWoman; i0++) {
                            ary.push(blankdoubletalkResult[i0][No1to3_Blank])
                        }

                        for (var Blankman = 0; Blankman < adjustmentJoinedCountMan; Blankman++) {
                            var TorFblank = overlappingAndBlank_Blank(ary, Blankman + 1, selectWoman, No1to3_Blank)
                            if (TorFblank == true) {
                                blankdoubletalkResult[selectWoman][No1to3_Blank] = Blankman + 1

                            }

                        }

                    }
                }
            }
        }

    }))

}
if (SbuttonUrl.match(/^(?=.*detail)(?=.*smartdevice_parties)/)) {//結果エクスポート
    $('.text-left:eq(0)').append($('<input type="button" id="id1153" value="投票結果のみ" style="width:90px;height:27px;font-size:13px;background:#F08080;" >').click(function () {
        //女性の人数把握
        var joinedCountWoman = document.querySelector("body > div > div:nth-child(6) > div > table > tbody").getElementsByTagName('tr').length - 1
        //男性の人数把握
        var joinedCountMan = document.querySelector("body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(1)").getElementsByTagName('th').length - 1
        function manExport() {
            //最終的な格納配列（男）
            var goodVoteMan = [];
            for (var man = 2; man < joinedCountMan + 2; man++) {
                var ary = [];
                for (var manNumvertical = 2; manNumvertical < joinedCountWoman + 2; manNumvertical++) {
                    var goodnum = document.querySelector(`body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(${manNumvertical}) > td:nth-child(${man})`).getElementsByClassName('col-sm-6')[1].textContent
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
                for (var inum = 1; inum <= intMax; inum++) {
                    var kari = ary.indexOf(`${inum}`)
                    numranking.push(kari + 1)
                }
                goodVoteMan.push(numranking);
            }
            return (goodVoteMan)
        }
        function womanExport() {
            //最終的な格納配列（女）
            var goodVoteWoman = [];
            for (var womanNum = 2; womanNum < joinedCountWoman + 2; womanNum++) {
                var lineElement = document.querySelector(`body > div > div:nth-child(6) > div > table > tbody > tr:nth-child(${womanNum})`)
                var ary = [];
                for (var womanNumvertical = 2; womanNumvertical < joinedCountMan + 2; womanNumvertical++) {
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
                goodVoteWoman.push(numranking);
            }
            return (goodVoteWoman)
            //console.log(goodVoteWoman.join('\n'))
        }
        var goodVoteMan = manExport()
        var goodVoteWoman = womanExport()
        var adjustmentJoinedCountMan = 0;
        var adjustmentJoinedCountWoman = 0;
        var doubletalkResult = [];
        function doubletalkArryinitialize(adjustmentJoinedCountWoman) {
            for (var i = 0; i < adjustmentJoinedCountWoman; i++) {

                var talkcount = [0, 0, 0];
                doubletalkResult.push(talkcount);

            }
        }
        if (joinedCountMan == joinedCountWoman) {
            adjustmentJoinedCountMan = joinedCountMan
            adjustmentJoinedCountWoman = joinedCountWoman
            doubletalkArryinitialize(adjustmentJoinedCountWoman)
        }
        if (joinedCountMan < joinedCountWoman) {
            adjustmentJoinedCountMan = joinedCountWoman
            adjustmentJoinedCountWoman = joinedCountWoman
            doubletalkArryinitialize(adjustmentJoinedCountWoman)

        } if (joinedCountWoman < joinedCountMan) {
            adjustmentJoinedCountMan = joinedCountMan
            adjustmentJoinedCountWoman = joinedCountMan
            doubletalkArryinitialize(adjustmentJoinedCountWoman)

        }
        function overlappingAndBlank(ver, ary, specifyMan, selectWoman, No1or2or3) {
            var included = false
            var Blankjudgment = false
            if (ary.includes(specifyMan) == false) {
                included = true
            }
            if (doubletalkResult[selectWoman][No1or2or3] == 0) {
                Blankjudgment = true
            }
            if (ver == 1) {
                if (doubletalkResult[selectWoman].includes(specifyMan) == true) {
                    Blankjudgment = false
                }
            }
            if (included && Blankjudgment) {
                return true
            } else {
                return false
            }

        }
        function overlappingAndBlank_manTo(ary, specifyMan, selectWoman, No1or2or3) {
            var included = false
            var Blankjudgment = false
            if (ary.includes(specifyMan) == false) {
                included = true
            }
            if (doubletalkResult[selectWoman][No1or2or3] == 0) {
                Blankjudgment = true
            }
            if (doubletalkResult[selectWoman].includes(specifyMan) == true) {
                Blankjudgment = false
            }
            if (included && Blankjudgment) {
                return true
            } else {
                return false
            }
        }
        //女性優先両想いver
        for (var No1to3man = 0; No1to3man < goodVoteWoman.length; No1to3man++) {


            for (var selectWoman = 0; selectWoman < goodVoteWoman.length; selectWoman++) {
                var WomanVote = goodVoteWoman[selectWoman]


                var specifyMan = WomanVote[No1to3man]
                // console.log(`第${No1to3man + 1}希望 ${selectWoman + 1} ${specifyMan} `)
                specifyMan = specifyMan || 0
                if (!specifyMan == 0) {
                    if (goodVoteMan[specifyMan - 1].includes(selectWoman + 1) == true) {
                        var ary = [];
                        var ary1 = [];
                        var ary2 = [];
                        for (var i0 = 0; i0 < adjustmentJoinedCountWoman; i0++) {
                            ary.push(doubletalkResult[i0][0])
                        }
                        for (var i1 = 0; i1 < adjustmentJoinedCountWoman; i1++) {
                            ary1.push(doubletalkResult[i1][1])
                        }
                        for (var i2 = 0; i2 < adjustmentJoinedCountWoman; i2++) {
                            ary2.push(doubletalkResult[i2][2])
                        }
                        var i0TorF = overlappingAndBlank(0, ary, specifyMan, selectWoman, 0)
                        //console.log(`ary ＊${ary}＊ i0TorF＊${i0TorF}＊ selectWoman＊${selectWoman}＊ specifyMan＊${specifyMan}＊ 見てる列＊0＊`)
                        if (i0TorF == true) {
                            doubletalkResult[selectWoman][0] = specifyMan
                        }
                        if (i0TorF == false) {
                            var i1TorF = overlappingAndBlank(0, ary1, specifyMan, selectWoman, 1)
                            //console.log(`ary＊${ary1}＊ i0TorF＊${i1TorF}＊ selectWoman＊${selectWoman}＊ specifyMan＊${specifyMan}＊ 見てる列＊1＊`)
                            if (i1TorF == true) {
                                doubletalkResult[selectWoman][1] = specifyMan
                            }
                            if (i1TorF == false) {
                                var i2TorF = overlappingAndBlank(0, ary2, specifyMan, selectWoman, 2)
                                if (i2TorF == true) {
                                    doubletalkResult[selectWoman][2] = specifyMan
                                }
                            }
                        }
                    }
                }
            }

        }
        //女性優先片思いver
        for (var No1to3man_womanTo = 0; No1to3man_womanTo < goodVoteWoman.length; No1to3man_womanTo++) {
            for (var selectWoman = 0; selectWoman < goodVoteWoman.length; selectWoman++) {
                var WomanVote = goodVoteWoman[selectWoman]


                var specifyMan = WomanVote[No1to3man_womanTo]
                // console.log(`第${No1to3man + 1}希望 ${selectWoman + 1} ${specifyMan} `)
                specifyMan = specifyMan || 0
                if (!specifyMan == 0) {
                    var ary = [];
                    var ary1 = [];
                    var ary2 = [];
                    for (var i0 = 0; i0 < adjustmentJoinedCountWoman; i0++) {
                        ary.push(doubletalkResult[i0][0])
                    }
                    for (var i1 = 0; i1 < adjustmentJoinedCountWoman; i1++) {
                        ary1.push(doubletalkResult[i1][1])
                    }
                    for (var i2 = 0; i2 < adjustmentJoinedCountWoman; i2++) {
                        ary2.push(doubletalkResult[i2][2])
                    }
                    var i0TorF = overlappingAndBlank(1, ary, specifyMan, selectWoman, 0)
                    //console.log(`ary ＊${ary}＊ i0TorF＊${i0TorF}＊ selectWoman＊${selectWoman}＊ specifyMan＊${specifyMan}＊ 見てる列＊0＊`)
                    if (i0TorF == true) {
                        doubletalkResult[selectWoman][0] = specifyMan
                    }
                    if (i0TorF == false) {
                        var i1TorF = overlappingAndBlank(1, ary1, specifyMan, selectWoman, 1)
                        //console.log(`ary＊${ary1}＊ i0TorF＊${i1TorF}＊ selectWoman＊${selectWoman}＊ specifyMan＊${specifyMan}＊ 見てる列＊1＊`)
                        if (i1TorF == true) {
                            doubletalkResult[selectWoman][1] = specifyMan
                        }
                        if (i1TorF == false) {
                            var i2TorF = overlappingAndBlank(1, ary2, specifyMan, selectWoman, 2)
                            if (i2TorF == true) {
                                doubletalkResult[selectWoman][2] = specifyMan
                            }
                        }
                    }

                }
            }
        }
        //男性片思いver
        for (var No1to3woman_manTo = 0; No1to3woman_manTo < goodVoteMan.length; No1to3woman_manTo++) {
            for (var selectMan = 0; selectMan < goodVoteMan.length; selectMan++) {
                var ManVote = goodVoteMan[selectMan]
                var specifyWoman = ManVote[No1to3woman_manTo]
                specifyWoman = specifyWoman || 0
                if (!specifyWoman == 0) {
                    var ary = [];
                    var ary1 = [];
                    var ary2 = [];
                    for (var i0 = 0; i0 < adjustmentJoinedCountWoman; i0++) {
                        ary.push(doubletalkResult[i0][0])
                    }
                    for (var i1 = 0; i1 < adjustmentJoinedCountWoman; i1++) {
                        ary1.push(doubletalkResult[i1][1])
                    }
                    for (var i2 = 0; i2 < adjustmentJoinedCountWoman; i2++) {
                        ary2.push(doubletalkResult[i2][2])
                    }
                    var i0TorF = overlappingAndBlank_manTo(ary, selectMan + 1, specifyWoman - 1, 0)
                    //console.log(`ary＊${ary}＊ i0TorF＊${i0TorF}＊ selectWoman＊${selectMan + 1}＊ specifyMan＊${specifyWoman - 1}＊ 見てる列＊0＊`)
                    if (i0TorF == true) {
                        doubletalkResult[specifyWoman - 1][0] = selectMan + 1
                    }
                    if (i0TorF == false) {
                        var i1TorF = overlappingAndBlank_manTo(ary1, selectMan + 1, specifyWoman - 1, 1)
                        //console.log(`ary＊${ary1}＊ i0TorF＊${i1TorF}＊ selectWoman＊${selectMan + 1}＊ specifyMan＊${specifyWoman - 1}＊ 見てる列＊1＊`)
                        if (i1TorF == true) {
                            doubletalkResult[specifyWoman - 1][1] = selectMan + 1
                        }
                        if (i1TorF == false) {
                            var i2TorF = overlappingAndBlank_manTo(ary2, selectMan + 1, specifyWoman - 1, 2)
                            if (i2TorF == true) {
                                doubletalkResult[specifyWoman - 1][2] = selectMan + 1
                            }
                        }
                    }


                }
            }

        } console.log(doubletalkResult)

    }))
}
