import ContactForm from '../../components/contact-form';
import Loader from '../../components/loader';
import PageHeader from '../../components/page-header';
import useEditContact from './use-edit-contact';

export default function EditContact() {
  const {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  } = useEditContact();

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Salva alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
