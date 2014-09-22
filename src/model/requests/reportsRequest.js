LostAndFound.Model.ReportsRequest = function (sector, type, itemTypes, offset, pageSize) {
    this.sector = sector;
    this.type = type;
    this.itemTypes = itemTypes;
    this.offset = offset;
    this.pageSize = pageSize;
    console.log(this);
};