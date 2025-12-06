'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Switch } from '@/components/ui/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'JifyWigs',
    storeEmail: 'admin@jifywigs.com',
    storePhone: '+2349049355400',
    storeAddress: '16 Lagos Street, Yaba, Lagos',
    currency: 'NGN',
    taxRate: 7.5,
    shippingCost: 2000,
    freeShippingThreshold: 50000,
  });

  const [paymentSettings, setPaymentSettings] = useState({
    paystackPublicKey: '',
    paystackSecretKey: '',
    flutterwavePublicKey: '',
    flutterwaveSecretKey: '',
    cashOnDelivery: true,
    bankTransfer: true,
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderConfirmations: true,
    shippingUpdates: true,
    marketingEmails: false,
    smsNotifications: true,
  });

  const handleSave = async (section: string) => {
    try {
      const data = section === 'store' ? storeSettings :
                   section === 'payment' ? paymentSettings :
                   notificationSettings;
      
      const response = await fetch(`/api/admin/settings/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        alert(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Configure store settings, payment methods, and notifications
        </p>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
  <TabsList className="grid grid-cols-1 md:grid-cols-3">
    <TabsTrigger value="store">Store Settings</TabsTrigger>
    <TabsTrigger value="payment">Payment Methods</TabsTrigger>
    <TabsTrigger value="notifications">Notifications</TabsTrigger>
  </TabsList>

        {/* Store Settings */}
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Store Information</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Name
                  </label>
                  <Input
                    value={storeSettings.storeName}
                    onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Email
                  </label>
                  <Input
                    type="email"
                    value={storeSettings.storeEmail}
                    onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Phone
                  </label>
                  <Input
                    value={storeSettings.storePhone}
                    onChange={(e) => setStoreSettings({...storeSettings, storePhone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={storeSettings.currency}
                    onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jify-primary focus:border-jify-primary"
                  >
                    <option value="NGN">Nigerian Naira (₦)</option>
                    <option value="USD">US Dollar ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Address
                  </label>
                  <Input
                    value={storeSettings.storeAddress}
                    onChange={(e) => setStoreSettings({...storeSettings, storeAddress: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tax Rate (%)
                  </label>
                  <Input
                    type="number"
                    value={storeSettings.taxRate}
                    onChange={(e) => setStoreSettings({...storeSettings, taxRate: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Cost (₦)
                  </label>
                  <Input
                    type="number"
                    value={storeSettings.shippingCost}
                    onChange={(e) => setStoreSettings({...storeSettings, shippingCost: parseInt(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Free Shipping Threshold (₦)
                  </label>
                  <Input
                    type="number"
                    value={storeSettings.freeShippingThreshold}
                    onChange={(e) => setStoreSettings({...storeSettings, freeShippingThreshold: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSave('store')}
                  className="bg-jify-primary hover:bg-jify-primary/90"
                >
                  Save Store Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Settings */}
        <TabsContent value="payment">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Payment Methods</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Cash on Delivery</h3>
                    <p className="text-sm text-gray-600">Allow customers to pay on delivery</p>
                  </div>
                  <Switch
                    checked={paymentSettings.cashOnDelivery}
                    onCheckedChange={(checked) => 
                      setPaymentSettings({...paymentSettings, cashOnDelivery: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Bank Transfer</h3>
                    <p className="text-sm text-gray-600">Accept bank transfers</p>
                  </div>
                  <Switch
                    checked={paymentSettings.bankTransfer}
                    onCheckedChange={(checked) => 
                      setPaymentSettings({...paymentSettings, bankTransfer: checked})
                    }
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Paystack Integration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Public Key
                      </label>
                      <Input
                        type="password"
                        value={paymentSettings.paystackPublicKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, paystackPublicKey: e.target.value})}
                        placeholder="pk_..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secret Key
                      </label>
                      <Input
                        type="password"
                        value={paymentSettings.paystackSecretKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, paystackSecretKey: e.target.value})}
                        placeholder="sk_..."
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Flutterwave Integration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Public Key
                      </label>
                      <Input
                        type="password"
                        value={paymentSettings.flutterwavePublicKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, flutterwavePublicKey: e.target.value})}
                        placeholder="FLWPUBK-..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secret Key
                      </label>
                      <Input
                        type="password"
                        value={paymentSettings.flutterwaveSecretKey}
                        onChange={(e) => setPaymentSettings({...paymentSettings, flutterwaveSecretKey: e.target.value})}
                        placeholder="FLWSECK-..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSave('payment')}
                  className="bg-jify-primary hover:bg-jify-primary/90"
                >
                  Save Payment Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold">Notification Preferences</h2>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailNotifications: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Order Confirmations</h3>
                    <p className="text-sm text-gray-600">Send order confirmation emails</p>
                  </div>
                  <Switch
                    checked={notificationSettings.orderConfirmations}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, orderConfirmations: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Shipping Updates</h3>
                    <p className="text-sm text-gray-600">Send shipping status updates</p>
                  </div>
                  <Switch
                    checked={notificationSettings.shippingUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, shippingUpdates: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-gray-600">Send promotional emails</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, marketingEmails: checked})
                    }
                  />
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">SMS Notifications</h3>
                    <p className="text-sm text-gray-600">Send SMS notifications</p>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, smsNotifications: checked})
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSave('notifications')}
                  className="bg-jify-primary hover:bg-jify-primary/90"
                >
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}