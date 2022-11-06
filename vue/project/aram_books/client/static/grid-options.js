const options = {
  scrollX: false,
  scrollY: false,
  rowHeight: 'auto',
  rowHeaders: [
    {
      type: 'rowNum',
      align: 'center',
      valign: 'middle'
    }
  ],
  header: {
    align: 'center'
  },
  // 페이징
  pageOptions: {
    useClient: true,
    perPage: 10
  }
}

const myLang = {
  name: 'ko',
  value: {
    display: {
      noData: '데이터가 없습니다.',
      loadingData: '데이터를 가져오는 중입니다.'
    }
  }
}

const columns = [
  {
    header: '제목',
    name: 'tit',
    sortingType: 'desc',
    sortable: false,
    resizable: false,
    whiteSpace: 'normal',
    width: '400'
  },
  {
    header: '날짜',
    name: 'data',
    sortingType: 'desc',
    sortable: true,
    resizable: true,
    align: 'center',
    whiteSpace: 'normal',
    width: '80'
  }
]

export { options, myLang, columns }
