import requests
import sys
import json
from datetime import datetime

class AlumniNetworkAPITester:
    def __init__(self, base_url="https://grad-connect-5.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.test_user = None
        self.test_user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
            self.failed_tests.append({"test": name, "error": details})

    def test_user_registration(self):
        """Test user registration"""
        test_data = {
            "full_name": "Test User Alumni",
            "email": f"test_user_{datetime.now().strftime('%H%M%S')}@test.com",
            "password": "TestPass123!",
            "university": "Global Horizon University",
            "passout_year": 2020,
            "location": "San Francisco, CA",
            "company": "Tech Corp",
            "domain": "Technology",
            "phone": "(555) 123-4567"
        }
        
        try:
            response = requests.post(f"{self.api_url}/register", json=test_data, timeout=10)
            if response.status_code == 200:
                self.test_user = response.json()
                self.test_user_id = self.test_user['id']
                self.log_test("User Registration", True)
                return True
            else:
                self.log_test("User Registration", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("User Registration", False, str(e))
            return False

    def test_user_login(self):
        """Test user login"""
        if not self.test_user:
            self.log_test("User Login", False, "No test user available")
            return False
            
        login_data = {
            "email": self.test_user['email'],
            "password": "TestPass123!"
        }
        
        try:
            response = requests.post(f"{self.api_url}/login", json=login_data, timeout=10)
            if response.status_code == 200:
                self.log_test("User Login", True)
                return True
            else:
                self.log_test("User Login", False, f"Status: {response.status_code}, Response: {response.text}")
                return False
        except Exception as e:
            self.log_test("User Login", False, str(e))
            return False

    def test_get_user(self):
        """Test get user by ID"""
        if not self.test_user_id:
            self.log_test("Get User", False, "No test user ID available")
            return False
            
        try:
            response = requests.get(f"{self.api_url}/user/{self.test_user_id}", timeout=10)
            if response.status_code == 200:
                user_data = response.json()
                if user_data['id'] == self.test_user_id:
                    self.log_test("Get User", True)
                    return True
                else:
                    self.log_test("Get User", False, "User ID mismatch")
                    return False
            else:
                self.log_test("Get User", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get User", False, str(e))
            return False

    def test_update_user(self):
        """Test update user profile"""
        if not self.test_user_id:
            self.log_test("Update User", False, "No test user ID available")
            return False
            
        update_data = {
            "location": "New York, NY",
            "company": "Updated Tech Corp"
        }
        
        try:
            response = requests.put(f"{self.api_url}/user/{self.test_user_id}", json=update_data, timeout=10)
            if response.status_code == 200:
                updated_user = response.json()
                if updated_user['location'] == "New York, NY":
                    self.log_test("Update User", True)
                    return True
                else:
                    self.log_test("Update User", False, "Update not reflected")
                    return False
            else:
                self.log_test("Update User", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Update User", False, str(e))
            return False

    def test_get_events(self):
        """Test get events"""
        try:
            response = requests.get(f"{self.api_url}/events", timeout=10)
            if response.status_code == 200:
                events = response.json()
                if len(events) == 10:  # Should return 10 events
                    # Check if 4 events have registration enabled
                    registrable_events = [e for e in events if e.get('has_registration', False)]
                    if len(registrable_events) == 4:
                        self.log_test("Get Events", True)
                        return True
                    else:
                        self.log_test("Get Events", False, f"Expected 4 registrable events, got {len(registrable_events)}")
                        return False
                else:
                    self.log_test("Get Events", False, f"Expected 10 events, got {len(events)}")
                    return False
            else:
                self.log_test("Get Events", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Events", False, str(e))
            return False

    def test_event_registration(self):
        """Test event registration"""
        if not self.test_user_id:
            self.log_test("Event Registration", False, "No test user ID available")
            return False
            
        registration_data = {
            "user_id": self.test_user_id,
            "event_id": "evt1",  # First event with registration
            "name": "Test User Alumni",
            "email": self.test_user['email'],
            "phone": "(555) 123-4567",
            "attend_dinner": True
        }
        
        try:
            response = requests.post(f"{self.api_url}/events/register", json=registration_data, timeout=10)
            if response.status_code == 200:
                result = response.json()
                if result.get('success'):
                    self.log_test("Event Registration", True)
                    return True
                else:
                    self.log_test("Event Registration", False, "Success flag not set")
                    return False
            else:
                self.log_test("Event Registration", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Event Registration", False, str(e))
            return False

    def test_get_alumni(self):
        """Test get alumni list"""
        try:
            response = requests.get(f"{self.api_url}/alumni", timeout=10)
            if response.status_code == 200:
                alumni = response.json()
                if isinstance(alumni, list):
                    self.log_test("Get Alumni", True)
                    return True
                else:
                    self.log_test("Get Alumni", False, "Response is not a list")
                    return False
            else:
                self.log_test("Get Alumni", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Alumni", False, str(e))
            return False

    def test_send_message(self):
        """Test send message"""
        if not self.test_user_id:
            self.log_test("Send Message", False, "No test user ID available")
            return False
            
        message_data = {
            "sender_id": self.test_user_id,
            "receiver_id": "dummy_receiver_id",
            "message": "Hello, this is a test message!"
        }
        
        try:
            response = requests.post(f"{self.api_url}/messages", json=message_data, timeout=10)
            if response.status_code == 200:
                message = response.json()
                if message['message'] == "Hello, this is a test message!":
                    self.log_test("Send Message", True)
                    return True
                else:
                    self.log_test("Send Message", False, "Message content mismatch")
                    return False
            else:
                self.log_test("Send Message", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Send Message", False, str(e))
            return False

    def test_get_messages(self):
        """Test get messages"""
        if not self.test_user_id:
            self.log_test("Get Messages", False, "No test user ID available")
            return False
            
        try:
            response = requests.get(f"{self.api_url}/messages/{self.test_user_id}", 
                                  params={"other_user_id": "dummy_receiver_id"}, timeout=10)
            if response.status_code == 200:
                messages = response.json()
                if isinstance(messages, list):
                    self.log_test("Get Messages", True)
                    return True
                else:
                    self.log_test("Get Messages", False, "Response is not a list")
                    return False
            else:
                self.log_test("Get Messages", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Messages", False, str(e))
            return False

    def test_create_donation(self):
        """Test create donation"""
        if not self.test_user_id:
            self.log_test("Create Donation", False, "No test user ID available")
            return False
            
        donation_data = {
            "user_id": self.test_user_id,
            "name": "Test User Alumni",
            "email": self.test_user['email'],
            "phone": "(555) 123-4567",
            "amount": 100.0,
            "purpose": "Scholarship Fund",
            "message": "Happy to contribute!"
        }
        
        try:
            response = requests.post(f"{self.api_url}/donate", json=donation_data, timeout=10)
            if response.status_code == 200:
                donation = response.json()
                if donation['amount'] == 100.0:
                    self.log_test("Create Donation", True)
                    return True
                else:
                    self.log_test("Create Donation", False, "Amount mismatch")
                    return False
            else:
                self.log_test("Create Donation", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Create Donation", False, str(e))
            return False

    def test_create_feedback(self):
        """Test create feedback"""
        feedback_data = {
            "name": "Test User Alumni",
            "email": "test@example.com",
            "message": "This is a test feedback message."
        }
        
        try:
            response = requests.post(f"{self.api_url}/feedback", json=feedback_data, timeout=10)
            if response.status_code == 200:
                feedback = response.json()
                if feedback['message'] == "This is a test feedback message.":
                    self.log_test("Create Feedback", True)
                    return True
                else:
                    self.log_test("Create Feedback", False, "Message mismatch")
                    return False
            else:
                self.log_test("Create Feedback", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Create Feedback", False, str(e))
            return False

    def test_get_stats(self):
        """Test get stats"""
        try:
            response = requests.get(f"{self.api_url}/stats", timeout=10)
            if response.status_code == 200:
                stats = response.json()
                required_keys = ['total_alumni', 'upcoming_events', 'recent_donations']
                if all(key in stats for key in required_keys):
                    self.log_test("Get Stats", True)
                    return True
                else:
                    self.log_test("Get Stats", False, "Missing required keys")
                    return False
            else:
                self.log_test("Get Stats", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("Get Stats", False, str(e))
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Alumni Network API Tests...")
        print(f"Testing against: {self.base_url}")
        print("=" * 50)
        
        # Test sequence
        tests = [
            self.test_user_registration,
            self.test_user_login,
            self.test_get_user,
            self.test_update_user,
            self.test_get_events,
            self.test_event_registration,
            self.test_get_alumni,
            self.test_send_message,
            self.test_get_messages,
            self.test_create_donation,
            self.test_create_feedback,
            self.test_get_stats
        ]
        
        for test in tests:
            test()
        
        print("=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for failed in self.failed_tests:
                print(f"  - {failed['test']}: {failed['error']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = AlumniNetworkAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())