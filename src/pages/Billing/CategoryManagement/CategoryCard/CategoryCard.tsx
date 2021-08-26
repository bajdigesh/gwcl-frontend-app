import { Box, Card, CardContent, IconButton, Typography } from '@material-ui/core';
import { CalendarIcon, PenIcon, User2Icon } from 'assets/images';
import { ControllableDrawer } from 'components/Drawer';
import { format } from 'date-fns';
import { MONTH_DAY_YEAR_FORMAT } from 'global/constants';
import AddNewCategory from 'pages/Billing/RightDrawer/AddNewCategory';
import { categoryInitialData } from 'pages/Billing/RightDrawer/AddNewCategory/schema';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStyles from './style';

interface IProps {
  data: any;
  type: 'independent' | 'linked';
}

const CategoryCard: React.FC<IProps> = ({ data, type }) => {
  const { t } = useTranslation(['common', 'billing']);
  const classes = useStyles();

  const [formData, setFormData] = useState<typeof categoryInitialData>(categoryInitialData);

  const renderLinkedCategory = () => {
    return data?.parent_linked_category
      ? `${data?.parent_linked_category?.name}[${data?.parent_linked_category?.code}]`
      : 'N/A';
  };

  const renderIndependentCategory = () => {
    if (Array.isArray(data?.children_linked_categories) && !data?.children_linked_categories.length) return 'N/A';

    return Array.isArray(data?.children_linked_categories) && data?.children_linked_categories.length
      ? data.children_linked_categories.map((item: any, index: number, arr: Array<any>) => {
          if (index + 1 === arr.length) return `${item.name}[${item.code}]`;

          return `${item.name}[${item.code}]` + ', ';
        })
      : null;
  };

  const handleIconButtonClick = (handleToggle: Function) => {
    const formData = {
      id: data?.id ?? '',
      name: data?.name ?? '',
      code: data?.code ?? '',
      description: data?.description ?? '',
      active: data?.active ? 'yes' : 'no',
      type: type,
      linked_category_id: data?.parent_linked_category
        ? { label: data.parent_linked_category?.name, value: data.parent_linked_category?.id }
        : null,
      linked_category_ids: [],
      customer_ids: data?.customer_ids ?? '',
      date: data?.created_at ? new Date(data.created_at) : null,
    };

    setFormData(formData);
    handleToggle();
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.cardContent}>
        <Typography variant="h6" className={classes.title}>
          {data?.name}[{data?.code}]
        </Typography>
        <div className={classes.info}>
          <span className={classes.infoItem}>
            <User2Icon className="icon" /> {data?.customers_count ?? 0} {t('common:users')}
          </span>
          <span className={classes.infoItem}>
            <CalendarIcon className="icon" />
            {t('common:createdOn')} {format(new Date(data?.created_at), MONTH_DAY_YEAR_FORMAT)}
          </span>
        </div>
        <Box className={classes.linkedWith}>
          <Typography variant="subtitle2" gutterBottom>
            {t('billing:linkedWith')}:
          </Typography>
          <Typography variant="body2" color="textPrimary" component="span">
            {type === 'linked' && renderLinkedCategory()}
            {type === 'independent' && renderIndependentCategory()}
          </Typography>
        </Box>
        <ControllableDrawer
          toggleElement={handleToggle => (
            <IconButton className={classes.editIcon} onClick={() => handleIconButtonClick(handleToggle)}>
              <PenIcon />
            </IconButton>
          )}
        >
          {toggleDrawer => <AddNewCategory formData={formData} toggleDrawer={toggleDrawer} activeTab={type} />}
        </ControllableDrawer>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
