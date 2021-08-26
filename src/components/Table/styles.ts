import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  tableOuterWrapper: {
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(4),
    },
    '& .gwcl-MuiTablePagination-toolbar': {
      [theme.breakpoints.down('sm')]: {
        padding: 0,

        '& .gwcl-MuiTablePagination-input': {
          marginRight: theme.spacing(1.75),
        },
        '& .gwcl-MuiTablePagination-actions': {
          marginLeft: theme.spacing(1.75),
        },
        '& .gwcl-MuiTablePagination-caption': {
          fontSize: theme.typography.pxToRem(12),
        },
        '& .gwcl-MuiSelect-selectMenu': {
          minHeight: 'inherit',
        },
      },
    },
  },

  tableWrapper: {
    maxWidth: '100%',
    overflow: 'auto',
    '& table': {
      borderCollapse: 'separate',
    },
  },

  tableBody: {
    '& tr': {
      '&.hoverable-row': {
        '& .actionButtons': {
          opacity: 0,
          transition: 'all 0.25s ease-in-out',
          '& p': {
            marginRight: theme.spacing(2),
            '&:hover': {
              cursor: 'pointer',
            },
          },
          [theme.breakpoints.down('sm')]: {
            opacity: 1,
          },
        },
        '&:hover': {
          '& td': {
            borderColor: theme.palette.primary.main,
            '& .actionButtons': {
              opacity: 1,
            },
          },
        },
      },
    },
    '& td': {
      color: theme.palette.grey['900'],
      fontWeight: 500,
      borderTop: '1px dashed transparent',
      borderBottom: '1px dashed transparent',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      '&:first-of-type': {
        borderLeft: '1px dashed transparent',
      },
      '&:last-of-type': {
        borderRight: '1px dashed transparent',
      },
    },
  },

  tableRow: props => ({
    '&:nth-of-type(odd)': {
      '& td': {
        background: theme.palette.info.light,
      },
    },
  }),

  tableCell: {},

  tableHeadCell: {
    color: theme.palette.grey[700],
    textTransform: 'uppercase',
    padding: theme.spacing(1, 2),
    lineHeight: 1.5,
    fontWeight: 600,
    fontSize: theme.typography.pxToRem(12),

    '& input[type="checkbox"]:checked': {
      '& + svg': {
        top: -1,
      },
    },
  },

  tableFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `${theme.spacing(0.75)}px ${theme.spacing(3)}px`,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    background: '#fff',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    transition: 'all 0.25s ease-in-out',
    '& .gwcl-MuiTypography-body2': {
      fontWeight: 600,
      color: theme.palette.grey['900'],
    },
  },

  tableFooterButtons: {
    '& .gwcl-MuiButton-root': {
      '&:first-child': {
        marginRight: theme.spacing(1),
      },
    },
  },

  checkboxEnabled: {
    '& table': {
      '& tr': {
        '& > .gwcl-MuiTableCell-root:first-of-type': {
          paddingRight: 0,
          minWidth: '32px !important',
          width: '32px !important',
          flex: '0 0 16px !important',
        },
      },
    },
  },

  hoverEnabled: {
    '& table': {
      '& tr': {
        '& > .gwcl-MuiTableCell-root:last-of-type': {
          flex: '0 0 160px !important',
        },
      },
    },
  },
}));

export default useStyles;
