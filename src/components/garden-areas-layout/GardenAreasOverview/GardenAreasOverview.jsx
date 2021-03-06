import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ElementOverview from '../../common/ElementOverview';
import areaPropTypes from '../../../propTypes/gardenArea';
import AddGardenAreaDialog from '../AddGardenAreaDialog';
import GardenAreasCollection from '../GardenAreasCollection';
import SearchAreaDialog from '../SearchAreaDialog';
import useDialog from '../../../hooks/useDialog';

const GardenAreasOverview = ({
  data,
  garden_id,
  onAreaPost,
  areaSubmitStatus,
  onAreaUpdate,
  onAreaDelete,
}) => {
  const [collectionFilter, setCollectionFilter] = useState('');
  const [idToDelete, setIdToDelete] = useState('');
  const [idToEdit, setIdToEdit] = useState('');

  const {
    isDialogOpen,
    toggleDialog,
    openDialog,
    closeDialog,
  } = useDialog();

  // Element overview component takes this object
  const gardenAreasElement = () => ({
    id: 'areas-overview',
    name: 'Garden Areas',
    // collection: data,
    prompts: {
      addArea: {
        id: 1,
        action: 'Add new area',
        desc: 'Add a representation of an area of your garden',
        dialogComponent: AddGardenAreaDialog,
        dialogProps: {
          onAreaSubmit: onAreaPost,
          areaSubmitStatus,
          closeDialog,
        },
      },
      filterAreaList: {
        id: 2,
        action: 'Filter',
        desc: 'Enter a name to filter the list',
        dialogComponent: SearchAreaDialog,
        dialogProps: {
          filter: collectionFilter,
          filterHandler: setCollectionFilter,
          closeDialog,
        },
      },
    },
  });

  return (
    <section id="garden-areas-collection">
      <ElementOverview
        element={gardenAreasElement()}
        collection={(
          <GardenAreasCollection
            items={data}
            garden_id={garden_id}
            filterString={collectionFilter}
            deleteControl={{ idToDelete, setIdToDelete }}
            editControl={{ idToEdit, setIdToEdit }}
            onAreaUpdate={onAreaUpdate}
            onAreaDelete={onAreaDelete}
            areaSubmitStatus={areaSubmitStatus}
          />
        )}
        dialogControls={{
          isDialogOpen,
          toggleDialog,
          openDialog,
          closeDialog,
        }}
      />
    </section>
  );
};

GardenAreasOverview.propTypes = {
  data: PropTypes.arrayOf(areaPropTypes),
  garden_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAreaPost: PropTypes.func,
  onAreaUpdate: PropTypes.func,
  onAreaDelete: PropTypes.func,
  areaSubmitStatus: PropTypes.shape({
    isSubmitting: PropTypes.bool,
    submitError: PropTypes.string,
    submitSuccess: PropTypes.bool,
    submitResponse: areaPropTypes,
    setSubmitSuccess: PropTypes.func,
    setSubmitError: PropTypes.func,
  }),
};

GardenAreasOverview.defaultProps = {
  data: [],
  garden_id: '',
  onAreaPost: () => {},
  onAreaUpdate: () => {},
  onAreaDelete: () => {},
  areaSubmitStatus: {
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
    submitResponse: null,
    setSubmitSuccess: () => {},
    setSubmitError: () => {},
  },
};

export default GardenAreasOverview;
