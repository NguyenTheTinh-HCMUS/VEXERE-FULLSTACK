import React from "react";
import "./style.scss";
import clsx from "clsx";
import {
  Paper,
  Collapse,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import "./style.scss";
import moment from "moment";
import momentDurationFormatSetup from 'moment-duration-format'
import TabChuyenXe from "../tab-chuyen-xe";
import "../scss/index.scss";
momentDurationFormatSetup(moment)
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 750,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function ChuyenXe(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const duration = () => {
    let start = moment(props.thongTin.ngayDi); // some random moment in time (in ms)
    let end = moment(props.thongTin.ngayDen); // some random moment after start (in ms)
    let diff = (end-start)
    // console.log((new Date(props.thongTin.ngayDen)).toLocaleTimeString())
    // console.log(diff)
    // console.log(end-start)

    
    return moment.duration(diff).format("h");
  };

  return (
    <div className="chi-tiet-chuyen-xe">
      <Paper className={`p-1 ${classes.root}`}>
        <div className="heading mb-2">40 chỗ còn trống</div>
        <div className="content">
          <div className="content-left">
            <img
              alt="anhXe"
              src={
                props.thongTin && props.thongTin.thongTinXe
                  ? props.thongTin.thongTinXe.hinhAnh
                  : ""
              }
            />
          </div>
          <div className="content-center">
            <p>
              <span className="content-center-daily">
                {props.thongTin.thongTinXe.daiLyXe.ten}
              </span>
              <span className="content-center-danhgia">
                • {props.thongTin.thongTinXe.danhSachDanhGia.length} Đánh giá
              </span>
            </p>
            <p>{`${props.thongTin.thongTinXe.tenXe} ${props.thongTin.thongTinXe.loaiXe.sucChua} chỗ`}</p>
            <div className="from-to">
              <svg
                className="TicketPC__LocationRouteSVG-sc-1mxgwjh-4 iGMGqV"
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={74}
                viewBox="0 0 14 74"
              >
                <path
                  fill="none"
                  stroke="#787878"
                  strokeLinecap="round"
                  strokeWidth={2}
                  strokeDasharray="0 7"
                  d="M7 13.5v46"
                />
                <g fill="none" stroke="#484848" strokeWidth={3}>
                  <circle cx={7} cy={7} r={7} stroke="none" />
                  <circle cx={7} cy={7} r="5.5" />
                </g>
                <path
                  d="M7 58a5.953 5.953 0 0 0-6 5.891 5.657 5.657 0 0 0 .525 2.4 37.124 37.124 0 0 0 5.222 7.591.338.338 0 0 0 .506 0 37.142 37.142 0 0 0 5.222-7.582A5.655 5.655 0 0 0 13 63.9 5.953 5.953 0 0 0 7 58zm0 8.95a3.092 3.092 0 0 1-3.117-3.06 3.117 3.117 0 0 1 6.234 0A3.092 3.092 0 0 1 7 66.95z"
                  fill="#787878"
                />
              </svg>

              <div className="from-to-content">
                <div className="content-from">
                  <div className="hour pr-3">
                    {moment(props.thongTin.ngayDi).format("HH:MM")}
                  </div>
                  <div className="place">• {props.thongTin.dauBen}</div>
                </div>
                <div className="duration">
                  {duration()} h
                </div>
                <div className="content-to">
                  <div className="hour pr-3">
                    {moment(props.thongTin.ngayDen).format("HH:MM")}
                  </div>
                  <div className="place">• {props.thongTin.cuoiBen} </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-right ml-5">
            {`${props.thongTin.giaVe} VNĐ`}
          </div>
        </div>

     <div style={{justifyContent: 'space-between', display: 'flex'}}>
    <div>
    <IconButton
          className={
            clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            }) + " outline"
          }
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
    </div  > 
       <div>
      <Link to={`/DatVe/${props.thongTin._id}`}>
      <Button variant="contained" className='outline bg-warning' size='large'  >
         Mua Vé
      </Button>
      </Link>
       </div>
     </div>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <TabChuyenXe thongTin={props.thongTin} />
        </Collapse>
      </Paper>
    </div>
  );
}
