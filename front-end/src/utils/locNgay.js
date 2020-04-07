import moment from 'moment'
const ds=[ {
    "_id": "5e7c3ed3936276313411a4a9",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-01T17:28:49.000Z",
    "ngayDen": "2020-04-02T07:33:37.000Z"
},
{
    "_id": "5e7c3ed3936276313411a4b7",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-03T07:06:17.000Z",
    "ngayDen": "2020-04-03T21:11:05.000Z"
},
{
    "_id": "5e7c3ed3936276313411a4f7",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-01T12:42:46.000Z",
    "ngayDen": "2020-04-02T02:47:34.000Z"
},
{
    "_id": "5e7c3ed3936276313411a59e",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-02T21:26:36.000Z",
    "ngayDen": "2020-04-03T11:31:24.000Z"
},
{
    "_id": "5e7c3ed3936276313411a5e8",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-03T16:41:37.000Z",
    "ngayDen": "2020-04-04T06:46:25.000Z"
},
{
    "_id": "5e7c3ed3936276313411a645",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-02T14:28:59.000Z",
    "ngayDen": "2020-04-03T04:33:47.000Z"
},
{
    "_id": "5e7c3ed3936276313411a652",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-04T03:09:49.000Z",
    "ngayDen": "2020-04-04T17:14:37.000Z"
},
{
    "_id": "5e7c3ed3936276313411a668",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-02T03:15:58.000Z",
    "ngayDen": "2020-04-02T17:20:46.000Z"
},
{
    "_id": "5e7c3fc3e26bfb4eacb389d2",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-03T09:16:50.000Z",
    "ngayDen": "2020-04-03T23:21:38.000Z"
},
{
    "_id": "5e7c3fc3e26bfb4eacb389e4",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-04T13:44:09.000Z",
    "ngayDen": "2020-04-05T03:48:57.000Z"
},
{
    "_id": "5e7c3fc3e26bfb4eacb38ad3",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-03T15:10:26.000Z",
    "ngayDen": "2020-04-04T05:15:14.000Z"
},
{
    "_id": "5e7c3fc3e26bfb4eacb38b94",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-01T23:03:29.000Z",
    "ngayDen": "2020-04-02T13:08:17.000Z"
},
{
    "_id": "5e7c3fc3e26bfb4eacb38bbf",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-01T15:38:46.000Z",
    "ngayDen": "2020-04-02T05:43:34.000Z"
},
{
    "_id": "5e7c3fc4e26bfb4eacb38c67",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-03T06:41:46.000Z",
    "ngayDen": "2020-04-03T20:46:34.000Z"
},
{
    "_id": "5e7c3fc4e26bfb4eacb38c80",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-03T21:43:30.000Z",
    "ngayDen": "2020-04-04T11:48:18.000Z"
},
{
    "_id": "5e7c3fc4e26bfb4eacb38c86",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-03T07:57:41.000Z",
    "ngayDen": "2020-04-03T22:02:29.000Z"
},
{
    "_id": "5e7c3fc4e26bfb4eacb38ca4",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-04T04:48:58.000Z",
    "ngayDen": "2020-04-04T18:53:46.000Z"
},
{
    "_id": "5e7c3fc4e26bfb4eacb38cd8",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-04T20:03:55.000Z",
    "ngayDen": "2020-04-05T10:08:43.000Z"
},
{
    "_id": "5e7c3fc4e26bfb4eacb38d18",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-02T04:05:37.000Z",
    "ngayDen": "2020-04-02T18:10:25.000Z"
},
{
    "_id": "5e7c3fc4e26bfb4eacb38d51",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-01T21:06:05.000Z",
    "ngayDen": "2020-04-02T11:10:53.000Z"
},
{
    "_id": "5e7c3fc4e26bfb4eacb38d74",
    "tuyen": "5e7b0e8c0679417b0d4fd690",
    "ngayDi": "2020-04-04T19:01:35.000Z",
    "ngayDen": "2020-04-05T09:06:23.000Z"
}]

const loc=(ds)=>{
    let ds_ngay=[]
    ds.map((item)=>{
        const ngay=moment(item.ngayDi).format('YYYY-MM-DD')
        if(ds_ngay.findIndex(item=>item===ngay)<0){
            ds_ngay.push(ngay)
        }
    })
    return ds_ngay
}
export default loc