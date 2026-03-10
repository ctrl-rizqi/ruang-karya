<?php

use App\Models\Classroom;
use App\Models\User;

test('guru can view classroom list', function () {
    $guru = User::factory()->guru()->create();
    Classroom::factory()->create(['name' => 'Class A']);

    $response = $this->actingAs($guru)->get(route('dashboard.classrooms.index'));

    $response->assertOk();
    $response->assertSee('Class A');
});

test('guru can create classroom', function () {
    $guru = User::factory()->guru()->create();

    $response = $this->actingAs($guru)->post(route('dashboard.classrooms.store'), [
        'name' => 'New Class',
    ]);

    $response->assertRedirect(route('dashboard.classrooms.index'));
    $this->assertDatabaseHas('classrooms', ['name' => 'New Class']);
});

test('guru can update classroom', function () {
    $guru = User::factory()->guru()->create();
    $classroom = Classroom::factory()->create(['name' => 'Old Name']);

    $response = $this->actingAs($guru)->put(route('dashboard.classrooms.update', $classroom), [
        'name' => 'Updated Name',
    ]);

    $response->assertRedirect(route('dashboard.classrooms.index'));
    $this->assertDatabaseHas('classrooms', ['id' => $classroom->id, 'name' => 'Updated Name']);
});

test('guru can delete classroom', function () {
    $guru = User::factory()->guru()->create();
    $classroom = Classroom::factory()->create();

    $response = $this->actingAs($guru)->delete(route('dashboard.classrooms.destroy', $classroom));

    $response->assertRedirect(route('dashboard.classrooms.index'));
    $this->assertDatabaseMissing('classrooms', ['id' => $classroom->id]);
});

test('siswa cannot access classroom management', function () {
    $siswa = User::factory()->siswa()->create();

    $response = $this->actingAs($siswa)->get(route('dashboard.classrooms.index'));

    $response->assertForbidden();
});
