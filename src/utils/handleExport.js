import axios from 'axios'
import {
  date
} from "@/utils/date.js";
// 导出Excel公用方法
export default function exportMethod(data, suffix) {
  axios({
    method: data.method,
    url: `${window.axiosUrl.ip}${data.url}${data.params ? '?' + data.params : ''}`,
    responseType: 'blob'
  }).then((res) => {
    const link = document.createElement('a')
    let blob = null;
    blob = new Blob([res.data], {
      type: 'application/vnd.ms-excel;accept-charset=utf-8'
    })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)

    // link.download = res.headers['content-disposition'] //下载后文件名
    link.download = String(data.fileName + date(new Date(), 'yyyy-MM-dd_hh_mm_ss') + '.xlsx') //下载的文件名
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }).catch(error => {
    this.$Notice.error({
      title: '错误',
      desc: '网络连接错误'
    })
    console.log(error)
  })
}
