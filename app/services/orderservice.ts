import { db } from '@/app/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  doc, 
  updateDoc,
  Timestamp 
} from 'firebase/firestore';

export interface Order {
  id?: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  items: {
    name: string;
    size: string;
    quantity: number;
    price: number;
    emoji: string;
  }[];
  total: number;
  paymentReference: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  notes?: string;
  createdAt?: any;
}

export const saveOrder = async (orderData: Omit<Order, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error('Error saving order:', error);
    return { success: false, error: error.message };
  }
};

export const getOrders = async () => {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    return { success: true, orders };
  } catch (error: any) {
    return { success: false, orders: [], error: error.message };
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};