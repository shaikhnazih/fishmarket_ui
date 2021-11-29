import React, { useState, useEffect, useCallback, useRef } from 'react';
import { OutlinedInput, Tooltip, TextField, Input, Button, Dialog, DialogActions, DialogContent, Icon, Grid, IconButton, Typography, Toolbar, AppBar, Avatar } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/FuseUtils';
import { useDispatch, useSelector } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, FormLabel, FormGroup, FormControlLabel } from '@material-ui/core/';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { tr } from 'date-fns/locale';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import PropTypes from 'prop-types';
import { VariableSizeList } from 'react-window';
import HierarchySelectorManualEditDialog from './HierarchySelectorManualEditDialog'
import { set } from 'date-fns';
const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;



  const getChildSize = child => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48;
    }

    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          key={itemCount}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={index => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};




const renderGroup = params => [
  <ListSubheader key={params.key} component="div">
    {params.key}
  </ListSubheader>,
  params.children,
];


const HierarchySelector = (props) => {


  const useStyles = makeStyles((theme) => ({
    root: {
      padding: 24, width: '100%',
    },
    formControl: {
      margin: theme.spacing(1),
      // minWidth: "95%",
      // maxWidth: "90%",
    },
    fullWith: { width: '100%', marginBottom: '10px' },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    }
    ,
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    listbox: {
      '& ul': {
        padding: 0,
        margin: 0,
      },
    },
    autocomplete: {
      width: props.width ? props.width : 300,
    }
  }));
  const classes = useStyles();


  const defaultFormState = {
    HeirarchyType: "", Items: [],
    EnableExclude: false, Empty: false
  };

  const { form, handleChange, setForm } = useForm(defaultFormState);
  const [selected, setSelected] = useState({ items: [], all: false, excludeItems: [], heirarchyType: props.HeirarchyType });
  const [initUsingValue, setInitUsingValue] = useState(false);

  const [dialogProps, setDialogProps] = useState({ open: false });
  const prevSelectedRef = useRef();

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;



  useEffect(() => {
    setForm({
      ...form, HeirarchyType: props.HeirarchyType, Items: props.Items, EnableExclude: props.EnableExclude, Disabled: props.disabled
    })

    if (props.value != undefined && props.value != null) {

      // change array of string to array of object
      var selectedItemsObject = [];
      if (props.value.items) {
        props.value.items.forEach((it) => {
          var item1 = form.Items.find(o => o.code === it);
          selectedItemsObject.push(item1)
        })
      }

      var excludedItemsObjectArray = [];
      if (props.value.excludeItems) {
        props.value.excludeItems.forEach((it) => {
          var item1 = form.Items.find(o => o.code === it);
          excludedItemsObjectArray.push(item1)
        })
      }

      setSelected({ ...selected, items: selectedItemsObject, excludeItems: excludedItemsObjectArray, all: props.value.all });
      setInitUsingValue(true);
    }


  }, [props.Items, props.value, props.disabled])


  function handleIncludeChange(event, value) {

    setSelected({ ...selected, items: value });
  }
  function handleExcludeChange(event, value) {
    setSelected({ ...selected, excludeItems: value });
  }

  function fromCommaSeperted(data) {

    let dataArr = data.split(',');

    var selectedItemsObject = [];

    dataArr.forEach((it) => {
      var item1 = form.Items.find(o => o.code === it);
      if (item1) {
        selectedItemsObject.push(item1)
      }
    })
    if (selected.all) {
      setSelected({ ...selected, items: [], excludeItems: selectedItemsObject });
    }
    else {
      setSelected({ ...selected, items: selectedItemsObject, excludeItems: [] });
    }


    setDialogProps({ ...dialogProps, open: false })

  }

  function getCommaSepeatedData() {

    let value = "";
    if (!selected.all && selected.items) {
      value = selected.items.map(it => it.code).join(',');
    }
    if (selected.all && selected.excludeItems) {
      value = selected.excludeItems.map(it => it.code).join(',');
    }
    return value;



  }
  const openDialog = () => { setDialogProps({ ...dialogProps, open: true }); }
  useEffect(() => {
    let active = true;
    setOptions(form.Items)
    return () => {
      active = false;
    };
  }, [loading]);
  function handleAllCheckBoxChange(event) {
    setSelected({ ...selected, all: !selected.all, items: [], excludeItems: [] })
  }
  useEffect(() => {

    let isEmpty = (selected.items.length || selected.all || selected.excludeItems.length) ? false : true;

    if (form.HeirarchyType) {

      if (!initUsingValue) {
        console.log(selected);
        props.onSelectChange({ ...selected, empty: isEmpty, items: selected.items.map((it => it.code)), excludeItems: selected.excludeItems.map((it => it.code)) });
      }
      setInitUsingValue(false);
    }

  }, [selected])

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 500,
      },
    },
  };


  return (
    <div style={form.Disabled ? { pointerEvents: "none", opacity: "0.4" } : {}}>
      <div style={{ float: "left" }}>

        {!selected.all &&
          <FormControl className={classes.formControl}>
            <Tooltip title="double-click to add comma seperated values" placement="top">

              <Autocomplete
                multiple

                id="checkboxes-tags-demo"
                disableListWrap
                ListboxComponent={ListboxComponent}
                // disabled={selected.all}
                onDoubleClick={openDialog}
                options={form.Items}
                value={selected.items}
                disableCloseOnSelect
                onChange={handleIncludeChange}
                renderTags={(selected) => { return (selected.length + ' Selected') }}
                getOptionLabel={option => option.displayName}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.displayName}
                  </React.Fragment>
                )}
                className={classes.autocomplete}
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder={'Search ' + form.HeirarchyType}
                    label={form.HeirarchyType}
                    fullWidth
                  />
                )}
              />
            </Tooltip>

          </FormControl>
        }
        {selected.all && <FormControl className={classes.formControl}>


          <Tooltip title="double-click to add comma seperated values" placement="top">


            <Autocomplete
              multiple
              id="excludedItems"
              disableListWrap
              ListboxComponent={ListboxComponent}
              // disabled={!selected.all}
              options={form.Items}
              value={selected.excludeItems}

              onDoubleClick={openDialog}
              disableCloseOnSelect
              onChange={handleExcludeChange}
              renderTags={(selected) => { return (selected.length + ' Selected') }}
              getOptionLabel={option => option.displayName}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.displayName}
                </React.Fragment>
              )}
              className={classes.autocomplete}
              renderInput={params => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={' Search ' + form.HeirarchyType}
                  label={'Exclude ' + form.HeirarchyType}
                  fullWidth
                />
              )}
            />
          </Tooltip>
        </FormControl>
        }
        <FormControl component="fieldset">
          <FormGroup aria-label="position" >
            <FormControlLabel
              value="All"
              control={<Checkbox checked={selected.all} onChange={handleAllCheckBoxChange} color="primary" />}
              label="All"
              labelPlacement="top"
            />
            {/* <a variant="contained" onClick={() => { alert(selected.items.map(it => it.code).join(',')) }}>Edit</a> */}
            {/* <a variant="contained" onClick={openDialog}>Edit</a> */}


          </FormGroup>
        </FormControl>



      </div>

      <HierarchySelectorManualEditDialog
        dialogProps={dialogProps}
        closeDialog={() => { setDialogProps({ ...dialogProps, open: false }) }}
        title={props.HeirarchyType}
        data={getCommaSepeatedData()}
        save={(data) => { fromCommaSeperted(data) }}
        all={selected.all}
      />
    </div>
  )
}

export default HierarchySelector;