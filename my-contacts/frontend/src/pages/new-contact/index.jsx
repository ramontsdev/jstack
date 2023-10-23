import ContactForm from '../../components/contact-form';
import PageHeader from '../../components/page-header';
import useNewContact from './use-new-contact';


export default function NewContact() {
  const { contactFormRef, handleSubmit } = useNewContact();

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
