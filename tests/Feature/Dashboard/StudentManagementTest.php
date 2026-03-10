<?php

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('guru can view student list on dashboard', function () {
    $guru = User::factory()->guru()->create();
    $student = User::factory()->siswa()->create([
        'name' => 'Siswa Pertama',
        'nisn' => '1234567890',
    ]);

    $response = $this->actingAs($guru)->get(route('dashboard.students.index'));

    $response->assertOk();
    $response->assertSee($student->name);
});

test('guru can create siswa from dashboard', function () {
    $guru = User::factory()->guru()->create();

    $response = $this->actingAs($guru)->post(route('dashboard.students.store'), [
        'nisn' => '1234567890',
        'name' => 'Siswa Baru',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
        'birth_date' => '2008-02-01',
        'address' => 'Bandung',
        'social_link' => 'https://instagram.com/siswa.baru',
    ]);

    $response->assertRedirect(route('dashboard.students.index'));

    $student = User::query()->where('nisn', '1234567890')->first();

    expect($student)->not->toBeNull();
    expect($student?->role)->toBe(UserRole::Siswa);
    expect(Hash::check('Password123!', (string) $student?->password))->toBeTrue();

    $this->assertDatabaseHas('users', [
        'nisn' => '1234567890',
        'name' => 'Siswa Baru',
        'birth_date' => '2008-02-01 00:00:00',
        'address' => 'Bandung',
        'social_link' => 'https://instagram.com/siswa.baru',
        'role' => UserRole::Siswa->value,
    ]);
});

test('guru can update siswa data from dashboard', function () {
    $guru = User::factory()->guru()->create();
    $student = User::factory()->siswa()->create([
        'nisn' => '1234567890',
        'name' => 'Siswa Lama',
    ]);

    $response = $this->actingAs($guru)->put(route('dashboard.students.update', $student), [
        'nisn' => '1234567891',
        'name' => 'Siswa Diperbarui',
        'password' => '',
        'password_confirmation' => '',
        'birth_date' => '2009-04-10',
        'address' => 'Jakarta',
        'social_link' => 'https://example.com/siswa',
    ]);

    $response->assertRedirect(route('dashboard.students.index'));

    $this->assertDatabaseHas('users', [
        'id' => $student->id,
        'nisn' => '1234567891',
        'name' => 'Siswa Diperbarui',
        'birth_date' => '2009-04-10 00:00:00',
        'address' => 'Jakarta',
        'social_link' => 'https://example.com/siswa',
    ]);

    expect(Hash::check('password', (string) $student->fresh()?->password))->toBeTrue();
});

test('guru can delete siswa from dashboard', function () {
    $guru = User::factory()->guru()->create();
    $student = User::factory()->siswa()->create();

    $response = $this->actingAs($guru)->delete(route('dashboard.students.destroy', $student));

    $response->assertRedirect(route('dashboard.students.index'));
    $this->assertDatabaseMissing('users', ['id' => $student->id]);
});

test('guru can view create and edit form pages', function () {
    $guru = User::factory()->guru()->create();
    $student = User::factory()->siswa()->create();

    $createResponse = $this->actingAs($guru)->get(route('dashboard.students.create'));
    $editResponse = $this->actingAs($guru)->get(route('dashboard.students.edit', $student));

    $createResponse->assertOk();
    $editResponse->assertOk();
});

test('siswa cannot manage siswa data from dashboard', function () {
    $siswa = User::factory()->siswa()->create();

    $response = $this->actingAs($siswa)->post(route('dashboard.students.store'), [
        'nisn' => '1234567890',
        'name' => 'Siswa Baru',
        'password' => 'Password123!',
        'password_confirmation' => 'Password123!',
    ]);

    $response->assertForbidden();
});

test('creating siswa requires nisn name and password', function () {
    $guru = User::factory()->guru()->create();

    $response = $this->actingAs($guru)->post(route('dashboard.students.store'), [
        'nisn' => '',
        'name' => '',
        'password' => '',
        'password_confirmation' => '',
    ]);

    $response->assertSessionHasErrors(['nisn', 'name', 'password']);
});

test('guru can filter siswa by name', function () {
    $guru = User::factory()->guru()->create();

    User::factory()->siswa()->create([
        'name' => 'Andi Saputra',
        'nisn' => '1234567801',
    ]);

    User::factory()->siswa()->create([
        'name' => 'Budi Pratama',
        'nisn' => '1234567802',
    ]);

    $response = $this->actingAs($guru)->get(route('dashboard.students.index', ['name' => 'Andi']));

    $response->assertOk();
    $response->assertSee('Andi Saputra');
    $response->assertDontSee('Budi Pratama');
});

test('guru can filter siswa by nisn', function () {
    $guru = User::factory()->guru()->create();

    User::factory()->siswa()->create([
        'name' => 'Siswa A',
        'nisn' => '1111111111',
    ]);

    User::factory()->siswa()->create([
        'name' => 'Siswa B',
        'nisn' => '2222222222',
    ]);

    $response = $this->actingAs($guru)->get(route('dashboard.students.index', ['nisn' => '1111']));

    $response->assertOk();
    $response->assertSee('Siswa A');
    $response->assertDontSee('Siswa B');
});

test('student list is paginated with ten records per page', function () {
    $guru = User::factory()->guru()->create();

    for ($index = 1; $index <= 12; $index++) {
        User::factory()->siswa()->create([
            'name' => sprintf('Siswa %02d', $index),
            'nisn' => sprintf('55555555%02d', $index),
        ]);
    }

    $firstPageResponse = $this->actingAs($guru)->get(route('dashboard.students.index'));
    $secondPageResponse = $this->actingAs($guru)->get(route('dashboard.students.index', ['page' => 2]));

    $firstPageResponse->assertOk();
    $firstPageResponse->assertSee('Siswa 01');
    $firstPageResponse->assertDontSee('Siswa 12');

    $secondPageResponse->assertOk();
    $secondPageResponse->assertSee('Siswa 12');
});
