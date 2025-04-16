<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
import { api } from '../api';
import type { Shipment } from '../types';

export default defineComponent({
  name: 'ShipmentList',
  setup() {
    const shipments = ref<Shipment[]>([]);
    const loading = ref(true);
    const error = ref<string | null>(null);
    
    const showAddShipmentModal = ref(false);
    const showEditShipmentModal = ref(false);
    const showDeleteShipmentModal = ref(false);
    const shipmentToDelete = ref<Shipment | null>(null);
    
    const shipmentForm = reactive<Partial<Shipment>>({
      id_user_address: 0,
      first_name: '',
      last_name: '',
      address_line: '',
      city: '',
      postal_code: '',
      phone: '',
      country: '',
      email: ''
    });
    
    const fetchShipments = async () => {
      loading.value = true;
      error.value = null;
      try {
        shipments.value = await api.getShipments();
      } catch (err) {
        console.error('Error fetching shipments:', err);
        error.value = 'Failed to load shipments. Please try again.';
      } finally {
        loading.value = false;
      }
    };
    
    const closeShipmentModal = () => {
      showAddShipmentModal.value = false;
      showEditShipmentModal.value = false;
      resetShipmentForm();
    };
    
    const resetShipmentForm = () => {
      shipmentForm.id_user_address = 0;
      shipmentForm.first_name = '';
      shipmentForm.last_name = '';
      shipmentForm.address_line = '';
      shipmentForm.city = '';
      shipmentForm.postal_code = '';
      shipmentForm.phone = '';
      shipmentForm.country = '';
      shipmentForm.email = '';
    };
    
    const editShipment = (shipment: Shipment) => {
      shipmentForm.id_user_address = shipment.id_user_address;
      shipmentForm.first_name = shipment.first_name;
      shipmentForm.last_name = shipment.last_name;
      shipmentForm.address_line = shipment.address_line;
      shipmentForm.city = shipment.city;
      shipmentForm.postal_code = shipment.postal_code;
      shipmentForm.phone = shipment.phone;
      shipmentForm.country = shipment.country;
      shipmentForm.email = shipment.email;
      
      showEditShipmentModal.value = true;
    };
    
    const submitShipmentForm = async () => {
      try {
        if (showEditShipmentModal.value && shipmentForm.id_user_address) {
          await api.updateShipment(shipmentForm.id_user_address, shipmentForm);
        } else {
          await api.createShipment(shipmentForm);
        }
        fetchShipments();
        closeShipmentModal();
      } catch (err) {
        console.error('Error submitting shipment:', err);
        error.value = 'Failed to save shipment. Please try again.';
      }
    };
    
    const confirmDeleteShipment = (shipment: Shipment) => {
      shipmentToDelete.value = shipment;
      showDeleteShipmentModal.value = true;
    };
    
    const deleteShipment = async () => {
      if (!shipmentToDelete.value) return;
      
      try {
        await api.deleteShipment(shipmentToDelete.value.id_user_address);
        fetchShipments();
      } catch (err) {
        console.error('Error deleting shipment:', err);
        error.value = 'Failed to delete shipment. Please try again.';
      } finally {
        showDeleteShipmentModal.value = false;
        shipmentToDelete.value = null;
      }
    };
    
    onMounted(() => {
      fetchShipments();
    });
    
    return {
      shipments,
      loading,
      error,
      showAddShipmentModal,
      showEditShipmentModal,
      showDeleteShipmentModal,
      shipmentToDelete,
      shipmentForm,
      closeShipmentModal,
      editShipment,
      submitShipmentForm,
      confirmDeleteShipment,
      deleteShipment
    };
  }
});
</script>

<template>
  <div class="shipment-list">
    <h2>Замовлення</h2>
    
    <div class="actions">
      <button class="btn btn-primary" @click="showAddShipmentModal = true">Додайте нове замовлення</button>
    </div>
    
    <div v-if="loading" class="loading">Loading shipments...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="shipments.length === 0" class="empty-state">
      No shipments found. Add your first shipment!
    </div>
    <div v-else class="shipments-table-container">
      <table class="shipments-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="shipment in shipments" :key="shipment.id_user_address">
            <td>{{ shipment.id_user_address }}</td>
            <td>{{ shipment.first_name }} {{ shipment.last_name }}</td>
            <td>{{ shipment.email }}</td>
            <td>{{ shipment.phone }}</td>
            <td>
              {{ shipment.address_line }}<br>
              {{ shipment.city }}, {{ shipment.postal_code }}<br>
              {{ shipment.country }}
            </td>
            <td class="actions-cell">
              <button class="btn btn-sm" @click="editShipment(shipment)">Edit</button>
              <button class="btn btn-sm btn-danger" @click="confirmDeleteShipment(shipment)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Add/Edit Shipment Modal -->
    <div v-if="showAddShipmentModal || showEditShipmentModal" class="modal-backdrop">
      <div class="modal">
        <h3>{{ showEditShipmentModal ? 'Edit Shipment' : 'Додати замовлення' }}</h3>
        <form @submit.prevent="submitShipmentForm">
          <div class="form-row">
            <div class="form-group">
              <label for="first_name">First Name</label>
              <input type="text" id="first_name" v-model="shipmentForm.first_name" required>
            </div>
            
            <div class="form-group">
              <label for="last_name">Last Name</label>
              <input type="text" id="last_name" v-model="shipmentForm.last_name" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="shipmentForm.email" required>
          </div>
          
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" v-model="shipmentForm.phone" required>
          </div>
          
          <div class="form-group">
            <label for="address_line">Address</label>
            <input type="text" id="address_line" v-model="shipmentForm.address_line" required>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" v-model="shipmentForm.city" required>
            </div>
            
            <div class="form-group">
              <label for="postal_code">Postal Code</label>
              <input type="text" id="postal_code" v-model="shipmentForm.postal_code" required>
            </div>
          </div>
          
          <div class="form-group">
            <label for="country">Country</label>
            <input type="text" id="country" v-model="shipmentForm.country" required>
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="closeShipmentModal">Cancel</button>
            <button type="submit" class="btn btn-primary">
              {{ showEditShipmentModal ? 'Update Shipment' : 'Add Shipment' }}
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteShipmentModal" class="modal-backdrop">
      <div class="modal delete-modal">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete the shipment for <strong>{{ shipmentToDelete?.first_name }} {{ shipmentToDelete?.last_name }}</strong>?</p>
        <div class="form-actions">
          <button class="btn btn-secondary" @click="showDeleteShipmentModal = false">Cancel</button>
          <button class="btn btn-danger" @click="deleteShipment">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shipment-list {
  padding: 1rem;
  
  h2 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  .actions {
    margin-bottom: 1.5rem;
    
    .btn-primary {
      background-color: #3498db;
      color: white;
    }
  }
  
  .loading, .error, .empty-state {
    text-align: center;
    padding: 2rem 0;
  }
  
  .error {
    color: #e74c3c;
  }
  
  .empty-state {
    color: #7f8c8d;
  }
  
  .shipments-table-container {
    overflow-x: auto;
  }
  
  .shipments-table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    
    th {
      background-color: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }
    
    tr:hover {
      background-color: #f5f5f5;
    }
    
    .actions-cell {
      white-space: nowrap;
      
      .btn {
        margin-right: 0.5rem;
        
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  
  // Modal styles
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    
    h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: #2c3e50;
    }
    
    &.delete-modal {
      max-width: 400px;
      text-align: center;
      
      p {
        margin-bottom: 1.5rem;
      }
    }
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 0;
    
    .form-group {
      flex: 1;
    }
  }
  
  .form-group {
    margin-bottom: 1.25rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #34495e;
    }
    
    input,
    textarea,
    select {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: #3498db;
      }
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    
    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      
      &-secondary {
        background-color: #95a5a6;
        color: white;
      }
      
      &-primary {
        background-color: #3498db;
        color: white;
      }
      
      &-danger {
        background-color: #e74c3c;
        color: white;
      }
      
      &:hover {
        opacity: 0.9;
      }
    }
  }
  
  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    
    &-sm {
      padding: 0.35rem 0.75rem;
      font-size: 0.85rem;
    }
    
    &-primary {
      background-color: #3498db;
      color: white;
    }
    
    &-secondary {
      background-color: #95a5a6;
      color: white;
    }
    
    &-danger {
      background-color: #e74c3c;
      color: white;
    }
    
    &:hover {
      opacity: 0.9;
    }
  }
}
</style>