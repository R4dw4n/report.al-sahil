import { axiosInstance } from "../axiosInstance"

export const reportServices = {
  convertReportFromFrontToBack: (name, tables, header, content, footer, updateFlag, deleteFlag, id) => {
    let report = {
      name: name,
      deleteReport: deleteFlag,
      updateReport: updateFlag,
      frontProperties: {
        header: [...header],
        content: [...content],
        footer: [...footer],
      },
      tables_name: tables,
      grids: [
        ...content.map((oneGrid, i) => {
          return {
            name: oneGrid.title,
            celles: [
              ...oneGrid.grid.map((item, ind) => {
                return {
                  field_id: item.insideContent?.id_field,
                  nameLabel: item.insideContent?.header?.text || '',
                  nameField: item.insideContent?.value?.fieldValue || '',
                  footerType: item.insideContent?.footer || [],
                  index: item.index,
                  properties: [
                    ...Object.entries(item.style).map(([key, val]) => {
                      return {
                        name: key,
                        value: val,
                      }
                    })
                  ]
                }
              })
            ]
          }
        })
      ]
    };

    // console.log('report', report);
    console.log(header);
    let headerFooter = [
      ...header.flatMap((oneHeader, i) => {
        return [
          ...oneHeader.arr.flatMap((item) => {
            if(item.type === 'images') {
              return {
                value: item.image_path,
                index: item.index,
                type: 4,
                location: 0,
              }
            }
            return {
              value: item.value,
              index: item.index,
              type: item.type === 'text' ? 2 : item.type === 'date'? 3: 4,
              location: 0,
            }
          })
        ]
      }),
      ...footer.flatMap((oneFooter, i) => {
        return [
          ...oneFooter.arr.flatMap((item) => {
            if(item.type === 'images') {
              return {
                value: item.image_path,
                index: item.index,
                type: 4,
                location: 1,
              }
            }
            return {
              value: item.value,
              index: item.index,
              type: item.type === 'text' ? 2 : item.type === 'date'? 3: 4,
              location: 1,
            }
          })
        ]
      })
    ]
    // console.log('headerFooter', headerFooter);
    report.headerFooterReportes = [...headerFooter]
    if(id)
      report.id = id;
      console.log('report', report);
    return {
      report: {...report}
    }
  },
  storeAll: (data) => {
    return axiosInstance().post('/storeAll', data)
  },
  updateAll: (data) => {
    return axiosInstance().post('/updateAll', data)
  },
  getFields: () => {
    return axiosInstance().get('/field')
  },
  showReport: (id) => {
    return axiosInstance().get(`/showReports/${id}`)
  },
  previewReport: (id) => {
    return axiosInstance().get(`/showReportsWithData/${id}`)
  },
  addImage: (data) => {
    console.log('/addImage', data)
    return axiosInstance().postForm('/addImage', data)
  },
  removeImage: (data) => {
    return axiosInstance().post('/deleteImage', data)
  },
}