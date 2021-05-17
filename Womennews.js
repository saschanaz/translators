{
	"translatorID": "c1f99315-2257-4a32-af1e-68cd8b7bc838",
	"label": "Womennews.co.kr",
	"creator": "Kagami Sascha Rosylight",
	"target": "^https?://www\\.womennews\\.co.kr",
	"minVersion": "3.0",
	"maxVersion": "",
	"priority": 100,
	"inRepository": true,
	"translatorType": 4,
	"browserSupport": "gcsibv",
	"lastUpdated": "2021-05-17 08:10:13"
}

/*
	***** BEGIN LICENSE BLOCK *****

	womennews.co.kr (여성신문) Translator
	Copyright © 2021 Kagami Sascha Rosylight

	This file is part of Zotero.

	Zotero is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	Zotero is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with Zotero. If not, see <http://www.gnu.org/licenses/>.

	***** END LICENSE BLOCK *****
*/

/* global attr */

function detectWeb(doc, url) {
	if (url.includes("articleView.html")) {
		return "newspaperArticle";
	}
	else if (getSearchResults(doc, true)) {
		return "multiple";
	}
	return false;
}

function getSearchResults(doc, checkOnly) {
	const items = {};
	let found = false;
	const rows = doc.querySelectorAll(".article-list-content .list-titles a");
	for (const row of rows) {
		const href = row.href;
		const title = ZU.trimInternal(row.textContent);
		if (!href || !title) continue;
		if (checkOnly) return true;
		found = true;
		items[href] = title;
	}
	return found ? items : false;
}

function doWeb(doc, url) {
	if (detectWeb(doc, url) == "multiple") {
		Zotero.selectItems(getSearchResults(doc, false), function (items) {
			if (items) ZU.processDocuments(Object.keys(items), scrape);
		});
	}
	else {
		scrape(doc, url);
	}
}

function scrape(doc, url) {
	var translator = Zotero.loadTranslator("web");
	// Embedded Metadata
	translator.setTranslator("951c027d-74ac-47d4-a107-9c3069ab7b48");

	translator.setHandler("itemDone", function (obj, item) {
		const author = attr(doc, 'meta[property="og:article:author"]', "content");
		if (author) {
			item.creators = author.split(", ").map(name => ({
				lastName: name,
				fieldMode: 1,
				creatorType: "author"
			}));
		}
		item.complete();
	});

	translator.getTranslatorObject(function (trans) {
		trans.itemType = "newspaperArticle";
		trans.doWeb(doc, url);
	});
}

/** BEGIN TEST CASES **/
var testCases = [
	{
		"type": "web",
		"url": "http://www.womennews.co.kr/news/articleView.html?idxno=211608",
		"items": [
			{
				"itemType": "newspaperArticle",
				"creators": [
					{
						"creatorType": "author",
						"lastName": "김규희 기자",
						"fieldMode": 1
					}
				],
				"tags": [
					{
						"tag": "이선호"
					},
					{
						"tag": "평택항"
					},
					{
						"tag": "참사"
					},
					{
						"tag": "아버지"
					},
					{
						"tag": "이재훈"
					},
					{
						"tag": "청년"
					},
					{
						"tag": "인터뷰"
					},
					{
						"tag": "산재"
					}
				],
				"title": "‘평택항 참사’ 이선호 아버지 “청년들, 위험한 일 안 할 권리 있다”",
				"publicationTitle": "여성신문",
				"section": "사회",
				"date": "2021-05-17T15:16:00+09:00",
				"url": "http://www.womennews.co.kr/news/articleView.html?idxno=211608",
				"abstractNote": "“우리 아들은 그곳이 얼마나 위험한지 알았으면 안 들어갔을 겁니다. 청년들에게 ‘위험한 일을 안 할 권리가 있다’고 말해주고 싶습니다. 시키는 대로 다 하면 안 됩니다. 위험한 일은 피해야 합니다.”아들이 일하다가 300kg 철판에 깔렸다. 처음 해보는 일이었는데, 안전교육, 안전장비, 안전관리자 아무것도 없었다. 사측은 사고 이후 119에 바로 신고하지 않고 윗선에 보고했다.‘평택항 참사’로 세상을 떠난 고(故) 이선호(23)씨 아버지 이재훈씨를 13일 경기도 평택시 안중백병원 장례식장에서 만났다. 그는 “기업들은 오로지 비용 절",
				"language": "ko",
				"libraryCatalog": "www.womennews.co.kr",
				"notes": [],
				"seeAlso": [],
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				]
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.womennews.co.kr/news/articleView.html?idxno=205478",
		"items": [
			{
				"itemType": "newspaperArticle",
				"creators": [
					{
						"creatorType": "author",
						"lastName": "이하나",
						"fieldMode": 1
					},
					{
						"creatorType": "author",
						"lastName": "진혜민",
						"fieldMode": 1
					},
					{
						"creatorType": "author",
						"lastName": "김서현",
						"fieldMode": 1
					},
					{
						"creatorType": "author",
						"lastName": "전성운 기자",
						"fieldMode": 1
					}
				],
				"tags": [
					{
						"tag": "92년생김지영"
					},
					{
						"tag": "번아웃"
					},
					{
						"tag": "페미니즘"
					}
				],
				"title": "[92년생 김지영①] 다 타버린 여성들…그래도 ‘페미니즘’",
				"publicationTitle": "여성신문",
				"section": "사회",
				"date": "2020-12-31T15:25:00+09:00",
				"url": "http://www.womennews.co.kr/news/articleView.html?idxno=205478",
				"abstractNote": "“저는 단 한 명의 여성도 구하지 못할 거 같아요.” 2019년 겨울, 여성 연예인 설리와 구하라 씨가 안타깝게 목숨을 끊었을 때 열린 추모제에서 스스로를 페미니스트라고 밝힌 한 여성이 고백하듯 말했다. 그는 2015년 강남역 여성 살해사건을 통해 페미니즘을 알았다고 한다. 페미니즘은 마치 구원과도 같았다.",
				"language": "ko",
				"libraryCatalog": "www.womennews.co.kr",
				"notes": [],
				"seeAlso": [],
				"attachments": [
					{
						"title": "Snapshot",
						"mimeType": "text/html"
					}
				]
			}
		]
	},
	{
		"type": "web",
		"url": "http://www.womennews.co.kr/news/articleList.html?sc_section_code=S1N1&view_type=sm",
		"items": "multiple"
	}
]
/** END TEST CASES **/
