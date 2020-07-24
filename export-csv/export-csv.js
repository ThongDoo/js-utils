import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

function exportToCSV(csvData, fileName) {
  const header = Object.keys(csvData[0]); // columns name
  const wscols = [];
  for (let i = 0; i < header.length; i++) {
    // columns length added
    wscols.push({ wch: header[i].length + 5 });
  }
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const ws = XLSX.utils.json_to_sheet(csvData);
  ws['!cols'] = wscols;
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
}

export default { exportToCSV };

//exportToCSV(array,'file.clsx')