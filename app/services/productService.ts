import { db } from '@/app/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore';

export interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  featured: boolean;
  createdAt?: any;
}

// Get all products
export const getProducts = async () => {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      products.push({ 
        id: doc.id, 
        ...data,
        price: data.price || 0,
        sizes: data.sizes || [],
        colors: data.colors || []
      } as Product);
    });
    return { success: true, products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, products: [], error };
  }
};

// Get products by category
export const getProductsByCategory = async (category: string) => {
  try {
    const q = query(
      collection(db, 'products'), 
      where('category', '==', category),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    return { success: true, products };
  } catch (error) {
    return { success: false, products: [], error };
  }
};

// Add new product
export const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding product:', error);
    return { success: false, error };
  }
};

// Get single product
export const getProduct = async (id: string) => {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, product: { id: docSnap.id, ...docSnap.data() } as Product };
    }
    return { success: false, error: 'Product not found' };
  } catch (error) {
    return { success: false, error };
  }
};

// Update product
export const updateProduct = async (id: string, data: Partial<Product>) => {
  try {
    await updateDoc(doc(db, 'products', id), data);
    return { success: true };
  } catch (error) {
    console.error('Error updating product:', error);
    return { success: false, error };
  }
};

// Delete product
export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'products', id));
    return { success: true };
  } catch (error) {
    console.error('Error deleting product:', error);
    return { success: false, error };
  }
};

// Get categories
export const getCategories = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'categories'));
    const categories: string[] = [];
    snapshot.forEach((doc) => {
      categories.push(doc.data().name);
    });
    return { success: true, categories };
  } catch (error) {
    return { success: false, categories: [], error };
  }
};