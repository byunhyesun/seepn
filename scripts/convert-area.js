const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Excel 파일 읽기
const workbook = XLSX.readFile(path.join(__dirname, '../data/korea_area.xlsx'));
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// JSON으로 변환
const jsonData = XLSX.utils.sheet_to_json(worksheet);

console.log('Area data:', JSON.stringify(jsonData, null, 2));

// JSON 파일로 저장
const outputPath = path.join(__dirname, '../src/data/areas.json');
const outputDir = path.dirname(outputPath);

// 디렉토리가 없으면 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));
console.log(`Areas saved to: ${outputPath}`);