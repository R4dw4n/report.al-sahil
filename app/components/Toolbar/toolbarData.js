import { FaFileImage } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { IoText } from "react-icons/io5";
import { FiColumns } from "react-icons/fi";
import { TbMathFunction, TbSum, TbBracketsAngle, TbMathMax, TbMathMin } from "react-icons/tb";


export const toolbarItems = [
  {
    label: "images",
    icon: <FaFileImage />,
    type: 'images',
    dropType: ['drop'],
    insideContent: {},
    style: {},
  },
  {
    label: 'label',
    icon: <IoText />,
    type: 'text',
    dropType: ['inside_object', 'drop'],
    insideContent: {},
    style: {
      fontSize: '16px',
      color: '#000',
      background: "00000000",
    },
  },
  {
    label: "add_column",
    icon: <FiColumns />,
    type: 'add_column',
    dropType: ['drop'],
    insideContent: {},
    style: {
      fontSize: '16px',
      color: '#000',
      background: "00000000",
    },
  },
  {
    label: "date",
    icon: <CiCalendarDate />,
    type: 'date',
    value: 'DATE',
    dropType: ['drop'],
    style: {
      fontSize: '16px',
      color: '#000',
      background: "00000000",
    },
  },
  {
    label: "functions",
    icon: <TbMathFunction />,
    type: 'none',
    dropDown: [
      {
        label: 'SUM',
        icon: <TbSum />,
        value: '',
        type: 'functions',
        function:"SUM",
        dropType: ['inside_object'],
        style: {
          fontSize: '16px',
          color: '#000',
          background: "00000000",
        },
      },
      {
        label: 'AVERAGE',
        icon: <TbBracketsAngle />,
        value: '',
        function:"AVERAGE",
        type: 'functions',
        dropType: ['inside_object'],
        style: {
          fontSize: '16px',
          color: '#000',
          background: "00000000",
        },
      },
      {
        label: 'MAX',
        icon: <TbMathMax />,
        value: '',
        function:'MAX',
        type: 'functions',
        dropType: ['inside_object'],
        style: {
          fontSize: '16px',
          color: '#000',
          background: "00000000",
        },
      },
      {
        label: 'MIN',
        icon: <TbMathMin />,
        value: '',
        function:'MIN',
        type: 'functions',
        dropType: ['inside_object'],
        style: {
          fontSize: '16px',
          color: '#000',
          background: "00000000",
        },
      },
    ],
  },
]