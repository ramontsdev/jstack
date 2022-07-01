import ContactForm from '../../components/contact-form';
import PageHeader from '../../components/page-header';
import contactsService from '../../services/contacts-service';
import toast from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        ...formData,
        category_id: formData.categoryId,
      };

      await contactsService.createContact(contact);

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      });
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />

      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
