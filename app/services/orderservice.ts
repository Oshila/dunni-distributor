import { db } from '@/app/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, doc, updateDoc, Timestamp } from 'firebase/firestore';

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
  } catch (error) {
    return { success: false, error };
  }
};

export const getOrders = async () => {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const orders: Order[] = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    return { success: true, orders };
  } catch (error) {
    return { success: false, orders: [], error };
  }
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  try {
    await updateDoc(doc(db, 'orders', orderId), { status });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};