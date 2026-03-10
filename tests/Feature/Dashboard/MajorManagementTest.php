<?php

use App\Models\Major;
use App\Models\User;

test('guru can view major list', function () {
    $guru = User::factory()->guru()->create();
    Major::factory()->create(['name' => 'Major A', 'code' => 'MA']);

    $response = $this->actingAs($guru)->get(route('dashboard.majors.index'));

    $response->assertOk();
    $response->assertSee('Major A');
    $response->assertSee('MA');
});

test('guru can create major', function () {
    $guru = User::factory()->guru()->create();

    $response = $this->actingAs($guru)->post(route('dashboard.majors.store'), [
        'name' => 'New Major',
        'code' => 'NM',
    ]);

    $response->assertRedirect(route('dashboard.majors.index'));
    $this->assertDatabaseHas('majors', ['name' => 'New Major', 'code' => 'NM']);
});

test('guru can update major', function () {
    $guru = User::factory()->guru()->create();
    $major = Major::factory()->create(['name' => 'Old Name', 'code' => 'OLD']);

    $response = $this->actingAs($guru)->put(route('dashboard.majors.update', $major), [
        'name' => 'Updated Name',
        'code' => 'NEW',
    ]);

    $response->assertRedirect(route('dashboard.majors.index'));
    $this->assertDatabaseHas('majors', ['id' => $major->id, 'name' => 'Updated Name', 'code' => 'NEW']);
});

test('guru can delete major', function () {
    $guru = User::factory()->guru()->create();
    $major = Major::factory()->create();

    $response = $this->actingAs($guru)->delete(route('dashboard.majors.destroy', $major));

    $response->assertRedirect(route('dashboard.majors.index'));
    $this->assertDatabaseMissing('majors', ['id' => $major->id]);
});

test('siswa cannot access major management', function () {
    $siswa = User::factory()->siswa()->create();

    $response = $this->actingAs($siswa)->get(route('dashboard.majors.index'));

    $response->assertForbidden();
});
