function selectOverviewData(data) {
    return { 'name': data.name, 'src': data.image.url, 'id': data.id }
}
function selectBreedData(data) {
    let usedData = { 'name': data[0].breeds[0].name, 'images': { 'src': [], 'name': data[0].breeds[0].name} }
    data.forEach(data => usedData.images.src.push(data.url))
    return usedData
}

export { selectBreedData, selectOverviewData }