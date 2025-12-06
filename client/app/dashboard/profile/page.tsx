// client/app/dashboard/profile/page.tsx
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-gray-600 mt-1">Update your personal information.</p>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <Input id="firstName" defaultValue="Sweetstack" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <Input id="lastName" defaultValue="J." />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
                <span className="text-gray-500 ml-1">(cannot be changed)</span>
              </label>
              <Input id="email" type="email" defaultValue="sweetstack@example.com" disabled />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <Input id="phone" type="tel" defaultValue="+234 803 123 4567" />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Shipping Addresses</h2>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Home</p>
                <p className="text-gray-600">123 Lekki Phase 1, Lagos</p>
                <p className="text-gray-600">+234 803 123 4567</p>
              </div>
              <Button size="sm" variant="outline">Edit</Button>
            </div>
          </div>
          <Button className="mt-4" variant="outline">
            + Add New Address
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Security</h2>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Change Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}