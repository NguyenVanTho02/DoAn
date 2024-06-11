import * as XLSX from "xlsx/xlsx.mjs"

const exporExcel = (data, nameSheet, nameFile) => {
  return new Promise((resolve, reject) =>  {
    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(data)
    XLSX.utils.book_append_sheet(wb, ws, nameSheet)
    XLSX.writeFile(wb, `${nameFile}.xlsx`)
    resolve("OK")
  })
}

export default exporExcel