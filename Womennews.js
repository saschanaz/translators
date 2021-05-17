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
						"lastName": "이세아 기자",
						"fieldMode": 1
					}
				],
				"tags": [
					{
						"tag": "강제추행"
					},
					{
						"tag": "보복인사"
					},
					{
						"tag": "서지현"
					},
					{
						"tag": "성추행"
					},
					{
						"tag": "안태근"
					},
					{
						"tag": "직권남용"
					}
				],
				"title": "공소시효 지나서...서지현 검사, ‘성추행·보복 인사’ 안태근 손배소 1심 패소",
				"publicationTitle": "여성신문",
				"section": "사회",
				"date": "2021-05-14T18:07:33+09:00",
				"url": "http://www.womennews.co.kr/news/articleView.html?idxno=211554",
				"abstractNote": "서지현 수원지검 성남지청 부부장검사가 성추행, 보복 인사 등을 겪었다며 안태근 전 검사장(전 법무부 검찰국장)과 국가를 상대로 낸 손해배상 청구 소송 1심에서 패소했다.서울중앙지법 민사93단독(김대원 판사)는 14일 서 검사가 제기한 손해배상 청구를 기각했다. 성추행에 대해서는 “강제추행이 있었더라도 사건 당시인 2010년 10월 이미 가해자를 현실적이고 구체적으로 인식했다고 보인다”며 “사건 후 3년이 훨씬 지나서 소송을 제기해 이미 시효가 지났다”고 밝혔다. 민법 제766조에 따라 불법행위로 인한 손해배상을 청구하려면 피해자가",
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
		"url": "http://www.womennews.co.kr/news/articleView.html?idxno=205665",
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
						"tag": "메갈리아"
					},
					{
						"tag": "고용불안"
					},
					{
						"tag": "빈곤"
					},
					{
						"tag": "안전비용"
					}
				],
				"title": "[92년생 김지영③] 아직도 싸워야 한다",
				"publicationTitle": "여성신문",
				"section": "사회",
				"date": "2021-01-04T09:29:00+09:00",
				"url": "http://www.womennews.co.kr/news/articleView.html?idxno=205665",
				"abstractNote": "여성신문이 2021년 신년 기획 을 통해 이 시대 여성들의 목소리를 싣습니다. 82년생, 92년생, 00년생 여성의 이야기를 들으며 ‘젠더갈등’이라는 이름 아래 그동안 ‘한국형 백래시’가 어떻게 작동했는지에 주목했습니다. 뿐만 아니라 성평등한 세상을 만들기 위해 우리 사회가 노력해야 할 방안 등을 살펴보려 합니다.*편집자 주 : 백래시(Backlash)는 어떠한 아이디어, 행동 또는 물체에 대한 강한 반발을 뜻하는 단어로, 성평등 및 젠더 운동 등의 흐름에 반대하는 운동 및 세력을 ‘백래시’라 부른다. (출처 :",
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
