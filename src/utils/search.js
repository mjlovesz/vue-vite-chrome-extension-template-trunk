export let getSuggestion = function(text, callback) {
  fetch(`https://api.bing.com/qsonhs.aspx?q=${escape(text)}`)
  .then(response => response.json())
  .then(data => {
    let result = []
    if (data.AS && data.AS.Results) {
      let dataResults = data.AS.Results

      dataResults.forEach((res) => {
        let suggests = res.Suggests
        result.push(... suggests.map(sug=> sug.Txt))
      })
    }
    callback(result)
  });
}

export let getSearcherUrl = function(text) {
  return `https://www.baidu.com/s?wd=${text||""}`
}
