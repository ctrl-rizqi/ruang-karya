<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('guru can view user list on dashboard', function () {
    $guru = User::factory()->guru()->create();
    $otherGuru = User::factory()->guru()->create([
        'name' => 'Guru Pertama',
        'nisn' => '1234567890',
    ]);
    $student = User::factory()->siswa()->create([
        'name' => 'Siswa Pertama',
        'nisn' => '1234567891',
    ]);

    $response = $this->actingAs($guru)->get(route('dashboard.users.index'));

    $response->assertOk();
    $response->assertSee($otherGuru->name);
    $response->assertSee($student->name);
});

test('guru can create guru user from dashboard', function () {
    $guru = User::factory()->guru()->create();

    $response = $this->actingAs($guru)->post(route('dashboard.users.store'), [
        'role' => UserRole::Guru->value,
        'nisn' => '2234567890',
        'name' => 'Guru Baru',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'gender' => 'P',
        'phone' => '081298765432',
        'birth_place' => 'Bandung',
        'birth_date' => '1990-02-01',
        'address' => 'Bandung',
        'bio' => 'Guru pembimbing pengembangan software sekolah.',
        'skills' => ['Mentoring', 'Laravel'],
        'achievements' => ['Pembina Juara LKS'],
        'interests' => ['Edutech'],
        'social_link' => 'https://instagram.com/guru.baru',
        'instagram' => 'https://instagram.com/guru.baru',
        'facebook' => 'https://facebook.com/guru.baru',
        'tiktok' => 'https://tiktok.com/@guru.baru',
        'linkedin' => 'https://linkedin.com/in/guru-baru',
    ]);

    $response->assertRedirect(route('dashboard.users.index'));

    $createdUser = User::query()->where('nisn', '2234567890')->first();

    expect($createdUser)->not->toBeNull();
    expect($createdUser?->role)->toBe(UserRole::Guru);
    expect(Hash::check('Password123!', (string) $createdUser?->password))->toBeTrue();
    expect($createdUser?->skills)->toBe(['Mentoring', 'Laravel']);
    expect($createdUser?->achievements)->toBe(['Pembina Juara LKS']);
    expect($createdUser?->interests)->toBe(['Edutech']);

    $this->assertDatabaseHas('users', [
        'nisn' => '2234567890',
        'name' => 'Guru Baru',
        'gender' => 'P',
        'phone' => '081298765432',
        'birth_place' => 'Bandung',
        'birth_date' => '1990-02-01 00:00:00',
        'address' => 'Bandung',
        'bio' => 'Guru pembimbing pengembangan software sekolah.',
        'social_link' => 'https://instagram.com/guru.baru',
        'instagram' => 'https://instagram.com/guru.baru',
        'facebook' => 'https://facebook.com/guru.baru',
        'tiktok' => 'https://tiktok.com/@guru.baru',
        'linkedin' => 'https://linkedin.com/in/guru-baru',
        'role' => UserRole::Guru->value,
    ]);
});

test('guru can update user data from dashboard', function () {
    $guru = User::factory()->guru()->create();
    $managedUser = User::factory()->siswa()->create([
        'nisn' => '1234567890',
        'name' => 'User Lama',
    ]);

    $response = $this->actingAs($guru)->put(route('dashboard.users.update', $managedUser), [
        'role' => UserRole::Guru->value,
        'nisn' => '1234567892',
        'name' => 'User Diperbarui',
        'password' => '',
        'password_confirmation' => '',
        'gender' => 'L',
        'phone' => '081200000000',
        'birth_place' => 'Yogyakarta',
        'birth_date' => '2009-04-10',
        'address' => 'Jakarta',
        'bio' => 'Suka membangun aplikasi web dan mobile.',
        'skills' => ['React', 'Laravel'],
        'achievements' => ['Top 3 Hackathon Sekolah'],
        'interests' => ['Software Engineering'],
        'social_link' => 'https://example.com/user',
        'instagram' => 'https://instagram.com/user.updated',
        'facebook' => 'https://facebook.com/user.updated',
        'tiktok' => 'https://tiktok.com/@user.updated',
        'linkedin' => 'https://linkedin.com/in/user-updated',
    ]);

    $response->assertRedirect(route('dashboard.users.index'));

    $this->assertDatabaseHas('users', [
        'id' => $managedUser->id,
        'role' => UserRole::Guru->value,
        'nisn' => '1234567892',
        'name' => 'User Diperbarui',
        'gender' => 'L',
        'phone' => '081200000000',
        'birth_place' => 'Yogyakarta',
        'birth_date' => '2009-04-10 00:00:00',
        'address' => 'Jakarta',
        'bio' => 'Suka membangun aplikasi web dan mobile.',
        'social_link' => 'https://example.com/user',
        'instagram' => 'https://instagram.com/user.updated',
        'facebook' => 'https://facebook.com/user.updated',
        'tiktok' => 'https://tiktok.com/@user.updated',
        'linkedin' => 'https://linkedin.com/in/user-updated',
    ]);

    $updatedUser = $managedUser->fresh();
    expect($updatedUser?->skills)->toBe(['React', 'Laravel']);
    expect($updatedUser?->achievements)->toBe(['Top 3 Hackathon Sekolah']);
    expect($updatedUser?->interests)->toBe(['Software Engineering']);

    expect(Hash::check('password', (string) $managedUser->fresh()?->password))->toBeTrue();
});

test('guru can delete user from dashboard', function () {
    $guru = User::factory()->guru()->create();
    $managedUser = User::factory()->siswa()->create();

    $response = $this->actingAs($guru)->delete(route('dashboard.users.destroy', $managedUser));

    $response->assertRedirect(route('dashboard.users.index'));
    $this->assertDatabaseMissing('users', ['id' => $managedUser->id]);
});

test('guru can view create and edit user form pages', function () {
    $guru = User::factory()->guru()->create();
    $managedUser = User::factory()->siswa()->create();

    $createResponse = $this->actingAs($guru)->get(route('dashboard.users.create'));
    $editResponse = $this->actingAs($guru)->get(route('dashboard.users.edit', $managedUser));

    $createResponse->assertOk();
    $editResponse->assertOk();
});

test('siswa cannot manage user data from dashboard', function () {
    $siswa = User::factory()->siswa()->create();

    $response = $this->actingAs($siswa)->post(route('dashboard.users.store'), [
        'role' => UserRole::Siswa->value,
        'nisn' => '1234567890',
        'name' => 'User Baru',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $response->assertForbidden();
});

test('creating user requires role nisn name and password', function () {
    $guru = User::factory()->guru()->create();

    $response = $this->actingAs($guru)->post(route('dashboard.users.store'), [
        'role' => '',
        'nisn' => '',
        'name' => '',
        'password' => '',
        'password_confirmation' => '',
    ]);

    $response->assertSessionHasErrors(['role', 'nisn', 'name', 'password']);
});

test('guru can filter users by name', function () {
    $guru = User::factory()->guru()->create();

    User::factory()->guru()->create([
        'name' => 'Andi Saputra',
        'nisn' => '1234567801',
    ]);

    User::factory()->siswa()->create([
        'name' => 'Budi Pratama',
        'nisn' => '1234567802',
    ]);

    $response = $this->actingAs($guru)->get(route('dashboard.users.index', ['name' => 'Andi']));

    $response->assertOk();
    $response->assertSee('Andi Saputra');
    $response->assertDontSee('Budi Pratama');
});

test('guru can filter users by nisn', function () {
    $guru = User::factory()->guru()->create();

    User::factory()->guru()->create([
        'name' => 'User A',
        'nisn' => '1111111111',
    ]);

    User::factory()->siswa()->create([
        'name' => 'User B',
        'nisn' => '2222222222',
    ]);

    $response = $this->actingAs($guru)->get(route('dashboard.users.index', ['nisn' => '1111']));

    $response->assertOk();
    $response->assertSee('User A');
    $response->assertDontSee('User B');
});

test('guru can filter users by role', function () {
    $guru = User::factory()->guru()->create();

    User::factory()->guru()->create([
        'name' => 'Guru Filtered',
        'nisn' => '3333333333',
    ]);

    User::factory()->siswa()->create([
        'name' => 'Siswa Filtered',
        'nisn' => '4444444444',
    ]);

    $response = $this->actingAs($guru)->get(route('dashboard.users.index', ['role' => UserRole::Guru->value]));

    $response->assertOk();
    $response->assertSee('Guru Filtered');
    $response->assertDontSee('Siswa Filtered');
});

test('user list is paginated with ten records per page', function () {
    $guru = User::factory()->guru()->create();

    for ($index = 1; $index <= 12; $index++) {
        User::factory()->siswa()->create([
            'name' => sprintf('User %02d', $index),
            'nisn' => sprintf('55555555%02d', $index),
        ]);
    }

    $firstPageResponse = $this->actingAs($guru)->get(route('dashboard.users.index'));
    $secondPageResponse = $this->actingAs($guru)->get(route('dashboard.users.index', ['page' => 2]));

    $firstPageResponse->assertOk();
    $firstPageResponse->assertSee('User 01');
    $firstPageResponse->assertDontSee('User 12');

    $secondPageResponse->assertOk();
    $secondPageResponse->assertSee('User 12');
});
