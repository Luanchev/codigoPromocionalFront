import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ValidadorService } from '../../core/services/validador.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-validador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatDialogModule],
  templateUrl: './validador.component.html',
  styleUrl: './validador.component.scss'
})
export class ValidadorComponent {
  // Variable para mensaje del modal
  statusDescription: string = "";

  formValidarCodigo: FormGroup = this.fb.group({
    codigo: ['', [Validators.required, Validators.minLength(3)]]
  });
  formAsignarCodigo: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    codigo: ['', [Validators.required, Validators.minLength(3)]]
  });


  @ViewChild('modalStatus') modalStatusRef!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private validadorService: ValidadorService,
    private dialog: MatDialog
  ) {
  }
  //validar que el codigo si es un cupon valido
  async validarCodigo() {
    if (this.formValidarCodigo.invalid) return;

    try {
      const request = {
        codigo: this.formValidarCodigo.get('codigo')?.value.trim()

      };

      // Llama a un endpoint específico para validar el código
      const respuesta = await firstValueFrom(this.validadorService.validateCodigo(request));

      this.abrirModal(`Validación exitosa. ${respuesta?.message}`);
    } catch (e: any) {
      this.abrirModal("Error al validar el código");
    }
  }

  //validar que el cupon si se pueda asignar a los datos enviados
  async validarDatos() {
    // Validar que los campos del formulario sean validos.
    if (this.formAsignarCodigo.invalid) return;


    try {
      // Consumir servicio para validar código y el correo

      // Obtiene objeto con parametros de 'email' y 'codigo', y eliminar espacios en blanco
      const request = {
        codigo: this.formAsignarCodigo.get('codigo')?.value.trim(),
        email: this.formAsignarCodigo.get('email')?.value.trim()
      };

      const respuesta = await firstValueFrom(this.validadorService.validateData(request));

      // this.abrirModal(respuesta?.message || "Se presento novedad en el consumo del servicio");
      this.abrirModal(`Se relaciono correctamente la información. ${respuesta?.message}`);

    } catch (e: any) {
      // this.abrirModal(e.error?.message);
      this.abrirModal("Validar información suministrada");
    }
  }

  abrirModal(descripcion: any) {
    this.statusDescription = descripcion;
    this.dialog.open(this.modalStatusRef);
  }

}
