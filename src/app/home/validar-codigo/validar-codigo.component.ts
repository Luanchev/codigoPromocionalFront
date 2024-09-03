import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ValidadorService } from '../../core/services/validador.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validar-codigo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatDialogModule],
  templateUrl: './validar-codigo.component.html',
  styleUrl: './validar-codigo.component.scss'
})
export class ValidarCodigoComponent {
// Variable para mensaje del modal
statusDescription: string = "";

formValidarCodigo: FormGroup = this.fb.group({
  codigo: ['', [Validators.required, Validators.minLength(3)]]
});

@ViewChild('modalStatus') modalStatusRef!: TemplateRef<any>;


constructor(
  private fb: FormBuilder,
  private validadorService: ValidadorService,
  private router: Router,
  private dialog: MatDialog
) {
  this.formValidarCodigo = this.fb.group({
    codigo: ['', Validators.required]
  });
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

    this.abrirModal(`Validación exitosa. ${respuesta.descripcion}`);
    this.cerrarModal
    // Restablecer el formulario
    this.formValidarCodigo.reset();
  } catch (e: any) {
    // Restablecer el formulario

    this.formValidarCodigo.reset();

    console.error('Error al validar el código', e);
    this.abrirModal("Error al validar el código");
  }
}
abrirModal(descripcion: any) {
  this.statusDescription = descripcion;
  this.dialog.open(this.modalStatusRef);
}
cerrarModal() {
  this.dialog.closeAll();  // Cierra el modal

  // Redirige a la página de asignar código (validador)
  this.router.navigate(['/validador']);
}


}
