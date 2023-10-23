import contactMapper from './mappers/contact-mapper.';
import HttpClient from './utils/http-client';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://192.168.0.100:3001');
  }

  async listContacts(orderBy, signal) {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy || 'asc'}`, { signal });

    return contacts.map(contactMapper.toDomain);
  }

  async getContactById(id, signal) {
    const contact = await this.httpClient.get(`/contacts/${id}`, { signal });

    return contactMapper.toDomain(contact);
  }

  createContact(contact) {
    const body = contactMapper.toPersistence(contact);

    return this.httpClient.post('/contacts', { body });
  }

  updateContact(id, contact) {
    const body = contactMapper.toPersistence(contact);

    return this.httpClient.put(`/contacts/${id}`, { body });
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactsService();
