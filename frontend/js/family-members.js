let allergies = [];
let preferences = [];
let familyMembers = [];

// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    loadFamilyMembers();
});

// Show message (success or error)
function showMessage(message, type = 'success') {
    const messageDiv = document.getElementById('message');
    messageDiv.innerHTML = `<div class="${type}">${message}</div>`;
    setTimeout(() => {
        messageDiv.innerHTML = '';
    }, 5000);
}

// Load all family members
async function loadFamilyMembers() {
    try {
        familyMembers = await familyAPI.list();
        displayFamilyMembers();
    } catch (error) {
        showMessage(`Error loading family members: ${error.message}`, 'error');
    }
}

// Display family members in table
function displayFamilyMembers() {
    const tbody = document.getElementById('membersList');
    tbody.innerHTML = '';

    if (familyMembers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">No family members yet. Add one to get started!</td></tr>';
        return;
    }

    familyMembers.forEach(member => {
        const allergyNames = member.allergies.map(a => a.name).join(', ') || 'None';
        const preferenceNames = member.preferences.map(p => p.name).join(', ') || 'None';
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${allergyNames}</td>
            <td>${preferenceNames}</td>
            <td>
                <button onclick="editMember('${member.id}')" class="btn btn-primary">Edit</button>
                <button onclick="deleteMember('${member.id}')" class="btn">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add new family member
async function addFamilyMember(event) {
    event.preventDefault();

    const name = document.getElementById('memberName').value.trim();
    if (!name) {
        showMessage('Please enter a name', 'error');
        return;
    }

    try {
        const newMember = await familyAPI.create({
            name,
            allergy_ids: [],
            preference_ids: []
        });

        familyMembers.push(newMember);
        displayFamilyMembers();
        document.getElementById('familyMemberForm').reset();
        showMessage(`Added ${name} successfully!`, 'success');
    } catch (error) {
        showMessage(`Error adding member: ${error.message}`, 'error');
    }
}

// Edit member (placeholder for now)
function editMember(id) {
    showMessage('Edit functionality coming soon', 'success');
}

// Delete member
async function deleteMember(id) {
    if (!confirm('Are you sure you want to delete this family member?')) {
        return;
    }

    try {
        await familyAPI.delete(id);
        familyMembers = familyMembers.filter(m => m.id !== id);
        displayFamilyMembers();
        showMessage('Family member deleted successfully', 'success');
    } catch (error) {
        showMessage(`Error deleting member: ${error.message}`, 'error');
    }
}

// Add new allergy (placeholder)
function addNewAllergy() {
    const input = document.getElementById('newAllergy');
    const allergyName = input.value.trim();
    if (allergyName) {
        console.log('Would add allergy:', allergyName);
        input.value = '';
    }
}

// Add new preference (placeholder)
function addNewPreference() {
    const input = document.getElementById('newPreference');
    const preferenceName = input.value.trim();
    if (preferenceName) {
        console.log('Would add preference:', preferenceName);
        input.value = '';
    }
}
