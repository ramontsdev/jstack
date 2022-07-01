import ContactForm from '../../components/contact-form';
import PageHeader from '../../components/page-header';

export default function EditContact() {
  return (
    <>
      <PageHeader title="Editar contato" />
      <ContactForm
        buttonLabel="Salva alterações"
      />
    </>
  );
}
