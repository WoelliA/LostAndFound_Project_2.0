﻿///#source 1 1 /src/model/requests/reportsRequest.js
LostAndFound.Model.ReportsRequest = function (sector, type, itemTypes, offset, pageSize) {
    this.sector = sector;
    this.type = type;
    this.itemTypes = itemTypes;
    this.offset = offset;
    this.pageSize = pageSize;
    console.log(this);
};
///#source 1 1 /src/model/requests/commentsRequest.js
LostAndFound.Model.CommentsRequest = function (offset, count, reportId) {
    this.offset = offset;
    this.count = count;
    this.reportId = reportId;
};
