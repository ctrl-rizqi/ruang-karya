<?php

use App\Models\Karya;
use App\Models\User;

test('siswa can access student home page', function () {
    $siswa = User::factory()->siswa()->create();

    $response = $this->actingAs($siswa)->get(route('student.home'));

    $response->assertOk();
    $response->assertSee($siswa->name);
});

test('guru cannot access student pages', function () {
    $guru = User::factory()->guru()->create();

    $response = $this->actingAs($guru)->get(route('student.home'));

    $response->assertForbidden();
});

test('siswa can update own profile data', function () {
    $siswa = User::factory()->siswa()->create([
        'name' => 'Nama Lama',
        'address' => null,
    ]);

    $response = $this->actingAs($siswa)->patch(route('student.profile.update'), [
        'name' => 'Nama Baru',
        'birth_date' => '2008-03-01',
        'address' => 'Surabaya',
        'social_link' => 'https://instagram.com/nama.baru',
    ]);

    $response->assertRedirect(route('student.profile.edit'));
    $this->assertDatabaseHas('users', [
        'id' => $siswa->id,
        'name' => 'Nama Baru',
        'birth_date' => '2008-03-01 00:00:00',
        'address' => 'Surabaya',
        'social_link' => 'https://instagram.com/nama.baru',
    ]);
});

test('siswa can create edit and delete own karya', function () {
    $siswa = User::factory()->siswa()->create();

    $createResponse = $this->actingAs($siswa)->post(route('student.karya.store'), [
        'title' => 'Karya Pertama',
        'description' => 'Deskripsi karya',
        'content' => 'Isi karya yang cukup panjang',
    ]);

    $createResponse->assertRedirect(route('student.karya.index'));

    $karya = Karya::query()->where('title', 'Karya Pertama')->first();
    expect($karya)->not->toBeNull();

    $updateResponse = $this->actingAs($siswa)->put(route('student.karya.update', $karya), [
        'title' => 'Karya Diperbarui',
        'description' => 'Deskripsi baru',
        'content' => 'Isi karya baru',
    ]);

    $updateResponse->assertRedirect(route('student.karya.index'));
    $this->assertDatabaseHas('karyas', [
        'id' => $karya->id,
        'title' => 'Karya Diperbarui',
    ]);

    $deleteResponse = $this->actingAs($siswa)->delete(route('student.karya.destroy', $karya));

    $deleteResponse->assertRedirect(route('student.karya.index'));
    $this->assertDatabaseMissing('karyas', ['id' => $karya->id]);
});

test('siswa cannot edit karya from another siswa', function () {
    $siswa = User::factory()->siswa()->create();
    $otherSiswa = User::factory()->siswa()->create();
    $otherKarya = Karya::factory()->create([
        'user_id' => $otherSiswa->id,
    ]);

    $response = $this->actingAs($siswa)->get(route('student.karya.edit', $otherKarya));

    $response->assertNotFound();
});

test('siswa can see student profile list and detail', function () {
    $siswa = User::factory()->siswa()->create();
    $otherSiswa = User::factory()->siswa()->create([
        'name' => 'Siswa Lain',
    ]);

    Karya::factory()->create([
        'user_id' => $otherSiswa->id,
        'title' => 'Karya Siswa Lain',
    ]);

    $listResponse = $this->actingAs($siswa)->get(route('student.profiles.index'));
    $detailResponse = $this->actingAs($siswa)->get(route('student.profiles.show', $otherSiswa));

    $listResponse->assertOk();
    $listResponse->assertSee('Siswa Lain');

    $detailResponse->assertOk();
    $detailResponse->assertSee('Karya Siswa Lain');
});
