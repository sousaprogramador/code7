import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import { Card, CardHeader, CardBody, Button } from 'reactstrap';

import { Creators as UserActions } from '../../store/ducks/user';
import Loading from '../../components/CircularLoading';
import FormModal from './FormModal';

const User = ({
  allowedRoles,
  getInviteAllowedRequest,
  createInviteRequest,
  loading,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const columns = [
    { title: 'Nome', render: (item) => item.profile.name },
    {
      title: 'Tipo de Acesso',
      render: (item) => (item.roles[0] ? item.roles[0].name : ''),
    },
    { title: 'Email', field: 'email', type: 'string' },
    {
      title: 'Data de Cadastro',
      render: (item) => (
        <span>{new Date(item.created_at).toLocaleDateString()}</span>
      ),
      customSort: (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
  ];

  useEffect(() => {
    getInviteAllowedRequest();
  }, [getInviteAllowedRequest]);

  function handleSelectOrganization(e, user) {
    e.preventDefault();
    setUserData(user);
    setIsOpenModal(true);
  }

  return (
    <div className="animated fadeIn">
      {loading ? (
        <Loading />
      ) : (
        <Card>
          <CardHeader>
            <div className="card-header-actions">
              <Button color="primary" onClick={() => setIsOpenModal(true)}>
                <AddIcon />
                Cadastrar
              </Button>
            </div>
          </CardHeader>

          <CardBody>
            <MaterialTable
              title={`Usuário ativos: ${allowedRoles.length}`}
              columns={columns}
              data={allowedRoles}
              options={{ emptyRowsWhenPaging: false, pageSize: 20 }}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Editar',
                  onClick: (e, rowData) => handleSelectOrganization(e, rowData),
                },
              ]}
              localization={{
                header: { actions: 'Ações' },
                toolbar: { searchPlaceholder: 'Pesquisar' },
                pagination: {
                  previousTooltip: 'Página Anterior',
                  nextTooltip: 'Próxima Página',
                  firstTooltip: 'Primeira Página',
                  lastTooltip: 'Última Página',
                  labelRowsSelect: 'Resultados',
                },
                body: {
                  editRow: {
                    deleteText: 'Deseja deletar este usuário ?',
                  },
                  deleteTooltip: 'Excluir',
                  editTooltip: 'Editar',
                  emptyDataSourceMessage: 'Nenhum resultado',
                },
              }}
            />
          </CardBody>
        </Card>
      )}

      <FormModal
        createInviteRequest={createInviteRequest}
        isOpenModal={isOpenModal}
        close={() => {
          setUserData(null);
          setIsOpenModal(false);
        }}
        userData={userData}
      />
    </div>
  );
};

User.defaultProps = { allowedRoles: [] };

const mapStateToProps = (state) => ({
  allowedRoles: state.user.data,
  loading: state.user.loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...UserActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);
