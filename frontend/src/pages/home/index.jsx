/* eslint-disable react/jsx-one-expression-per-line */
import { Container } from './styles';

import Loader from '../../components/loader';
import Modal from '../../components/modal';

import ContactsList from './components/contacts-list';
import EmptyList from './components/empty-list';
import ErrorStatus from './components/error-status';
import Header from './components/header';
import InputSearch from './components/input-search';
import SearchNotFound from './components/search-not-found';
import useHome from './use-home';


export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />
      )}

      <Header
        hasError={hasError}
        qtyOfContacts={contacts.length}
        qtyOfFilteredContacts={filteredContacts.length}
      />

      {hasError && (<ErrorStatus onTryAgain={handleTryAgain} />)}

      {
        !hasError && (
          <>
            {(contacts.length < 1 && !isLoading) && (
              <EmptyList />
            )}

            {(contacts.length > 0 && filteredContacts.length < 1) && (
              <SearchNotFound searchTerm={searchTerm} />
            )}

            <ContactsList
              filteredContacts={filteredContacts}
              orderBy={orderBy}
              onToggleOrderBy={handleToggleOrderBy}
              onDeleteContact={handleDeleteContact}
            />

            <Modal
              danger
              isLoading={isLoadingDelete}
              visible={isDeleteModalVisible}
              title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
              confirmLabel="Deletar"
              onCancel={handleCloseDeleteModal}
              onConfirm={handleConfirmDeleteContact}
            >
              <p>Esta ação não poderá ser desfeita.</p>
            </Modal>
          </>
        )
      }
    </Container>
  );
}
